import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { Writable } from 'node:stream'
import { StaticRouter } from 'react-router'
import App from './App.jsx'
import { languageForHost, ORIGINS } from './lib/site'
import { normalizePost } from './lib/posts'
import { getPageMeta, headTags, normalizePath, postIdFromPath } from './lib/seo'
import { listPosts, getPost } from './lib/firestore-rest'

// Built by `vite build --ssr` into ssr/ and called by api/render.js for every page.

const HOME_POSTS = 3

// The data each page renders with; the same object is printed into the HTML for the browser.
async function loadData(path) {
  if (path === '/') return { path, posts: await listPosts(HOME_POSTS) }
  if (path === '/news') return { path, posts: await listPosts() }
  const id = postIdFromPath(path)
  if (id) return { path, post: await getPost(id) }
  return null
}

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// JSON inside <script>: no "</script>" or HTML comment can break out
const safeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c')

const printTags = (tags) =>
  tags
    .map(([tag, attrs, text]) => {
      const attributes = Object.entries(attrs).map(([k, v]) => ` ${k}="${escapeHtml(v)}"`).join('')
      if (tag === 'meta' || tag === 'link') return `<${tag}${attributes} data-seo>`
      if (tag === 'script') return `<script${attributes} data-seo>${text.replace(/</g, '\\u003c')}</script>`
      return `<${tag}${attributes}>${escapeHtml(text)}</${tag}>`
    })
    .join('\n    ')

function renderApp(element) {
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk
        callback()
      },
    })
    sink.on('finish', () => resolve(html))
    const stream = renderToPipeableStream(element, {
      // wait for the lazy page, so the HTML holds the whole page
      onAllReady: () => stream.pipe(sink),
      onShellError: reject,
      onError: reject,
    })
  })
}

// Returns the pieces api/render.js puts into the built index.html.
export async function render({ url, host }) {
  const language = languageForHost(host)
  const path = normalizePath(new URL(url, 'http://localhost').pathname)
  const data = await loadData(path)
  const clientData = data && {
    ...data,
    posts: data.posts?.map(normalizePost),
    post: data.post && normalizePost(data.post),
  }

  const meta = getPageMeta(path, language, language, clientData || {})

  // The admin page needs the browser (sign-in); it gets the bare app shell.
  const html = path === '/admin'
    ? ''
    : await renderApp(
        <StaticRouter location={url}>
          <App initialLanguage={language} initialData={clientData} />
        </StaticRouter>
      )

  return {
    status: meta.status,
    noindex: meta.noindex,
    language,
    head: printTags(headTags(meta, language, language)),
    html,
    // the raw JSON (ISO dates); entry-client turns it back into Dates
    dataScript: data ? `<script>window.__INITIAL_DATA__=${safeJson(data)}</script>` : '',
  }
}

const STATIC_PATHS = ['/', '/news', '/how-its-done', '/privacy', '/accessibility']

const xmlEscape = (value) => escapeHtml(value).replace(/'/g, '&apos;')

export async function sitemap(host) {
  const language = languageForHost(host)
  const posts = await listPosts()
  const entry = (path, { lastmod, alternates = true } = {}) => {
    const links = alternates
      ? ['he', 'en']
          .map(l => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${xmlEscape(ORIGINS[l] + path)}"/>`)
          .join('') +
        `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(ORIGINS.he + path)}"/>`
      : ''
    return `  <url>\n    <loc>${xmlEscape(ORIGINS[language] + path)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}${links}\n  </url>`
  }
  const newest = posts[0] && (posts[0].updatedAt || posts[0].createdAt)
  const urls = [
    ...STATIC_PATHS.map(path => entry(path, { lastmod: ['/', '/news'].includes(path) && newest ? newest.slice(0, 10) : undefined })),
    ...posts.map(post =>
      entry(`/news/${post.id}`, {
        lastmod: (post.updatedAt || post.createdAt || '').slice(0, 10) || undefined,
        alternates: Boolean(post.title?.en),
      })
    ),
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}

export function robots(host) {
  const language = languageForHost(host)
  return `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${ORIGINS[language]}/sitemap.xml
`
}

export { PRODUCTION_HOSTS } from './lib/site'
