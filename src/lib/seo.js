import { translations } from '../translations'
import { ORIGINS, OG_IMAGE, LOGO_PATH } from './site'
import { localized } from './posts'

// Everything a page says about itself to search engines and link previews.
// The server prints it into <head>; the browser keeps it current on client navigation.

const POST_PATH = /^\/news\/([^/]+)$/

export const normalizePath = (pathname) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

export const postIdFromPath = (pathname) => POST_PATH.exec(normalizePath(pathname))?.[1] ?? null

const STATIC_PAGES = {
  '/': 'home',
  '/news': 'news',
  '/how-its-done': 'howItsDone',
  '/privacy': 'privacy',
  '/accessibility': 'accessibility',
}

const clip = (text, max = 160) => {
  const flat = text.replace(/\s+/g, ' ').trim()
  return flat.length <= max ? flat : `${flat.slice(0, max - 1).replace(/\s+\S*$/, '')}…`
}

// language: the language the page is shown in.
// siteLanguage: the domain's language, which decides the canonical address.
export function getPageMeta(pathname, language, siteLanguage, { post } = {}) {
  const path = normalizePath(pathname)
  const s = translations[language].seo
  const origin = ORIGINS[siteLanguage]
  const organization = {
    '@type': 'Organization',
    name: s.siteName,
    url: origin,
    logo: `${origin}${LOGO_PATH}`,
  }
  const base = {
    path,
    status: 200,
    noindex: false,
    alternates: true,
    type: 'website',
    image: { url: `${origin}${OG_IMAGE.path}`, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: s.imageAlt },
    jsonLd: [],
  }

  if (path === '/admin') {
    return { ...base, title: `Admin${s.titleSuffix}`, description: '', noindex: true, alternates: false }
  }

  const page = STATIC_PAGES[path]
  if (page) {
    const meta = { ...base, title: s[page].title, description: s[page].description }
    if (page === 'home') {
      meta.jsonLd = [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: s.siteName, url: origin, inLanguage: language },
        { '@context': 'https://schema.org', ...organization },
      ]
    }
    return meta
  }

  if (postIdFromPath(path) && post) {
    const title = localized(post.title, language)
    const description = clip(localized(post.excerpt, language) || localized(post.content, language))
    const url = `${origin}${path}`
    const image = post.image ? { url: post.image, alt: title } : base.image
    return {
      ...base,
      title: `${title}${s.titleSuffix}`,
      description,
      type: 'article',
      image,
      published: post.createdAt?.toISOString(),
      modified: (post.updatedAt || post.createdAt)?.toISOString(),
      // only when there is an English version, so .com doesn't repeat the Hebrew text
      alternates: Boolean(post.title?.en),
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: clip(title, 110),
          description,
          image: [image.url],
          datePublished: post.createdAt?.toISOString(),
          dateModified: (post.updatedAt || post.createdAt)?.toISOString(),
          inLanguage: language,
          mainEntityOfPage: url,
          author: organization,
          publisher: organization,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: s.home.crumb, item: `${origin}/` },
            { '@type': 'ListItem', position: 2, name: s.news.crumb, item: `${origin}/news` },
            { '@type': 'ListItem', position: 3, name: title, item: url },
          ],
        },
      ],
    }
  }

  return { ...base, status: 404, title: s.notFound.title, description: '', noindex: true, alternates: false }
}

// The <head> tags for a page, as [tag, attributes, text] so the server can print them
// and the browser can build the same elements.
export function headTags(meta, language, siteLanguage) {
  const s = translations[language].seo
  const canonical = `${ORIGINS[siteLanguage]}${meta.path}`
  const tags = [['title', {}, meta.title]]
  const add = (tag, attrs, text) => tags.push([tag, attrs, text])

  if (meta.description) add('meta', { name: 'description', content: meta.description })
  if (meta.noindex) {
    add('meta', { name: 'robots', content: 'noindex, nofollow' })
    return tags
  }

  add('link', { rel: 'canonical', href: canonical })
  if (meta.alternates) {
    add('link', { rel: 'alternate', hreflang: 'he', href: `${ORIGINS.he}${meta.path}` })
    add('link', { rel: 'alternate', hreflang: 'en', href: `${ORIGINS.en}${meta.path}` })
    add('link', { rel: 'alternate', hreflang: 'x-default', href: `${ORIGINS.he}${meta.path}` })
  }

  add('meta', { property: 'og:site_name', content: s.siteName })
  add('meta', { property: 'og:type', content: meta.type })
  add('meta', { property: 'og:title', content: meta.title })
  add('meta', { property: 'og:description', content: meta.description })
  add('meta', { property: 'og:url', content: canonical })
  add('meta', { property: 'og:locale', content: language === 'he' ? 'he_IL' : 'en_US' })
  add('meta', { property: 'og:image', content: meta.image.url })
  if (meta.image.width) {
    add('meta', { property: 'og:image:width', content: String(meta.image.width) })
    add('meta', { property: 'og:image:height', content: String(meta.image.height) })
  }
  add('meta', { property: 'og:image:alt', content: meta.image.alt })
  if (meta.published) add('meta', { property: 'article:published_time', content: meta.published })
  if (meta.modified) add('meta', { property: 'article:modified_time', content: meta.modified })
  add('meta', { name: 'twitter:card', content: 'summary_large_image' })

  for (const data of meta.jsonLd) {
    add('script', { type: 'application/ld+json' }, JSON.stringify(data))
  }
  return tags
}
