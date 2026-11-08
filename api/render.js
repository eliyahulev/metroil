import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { render, sitemap, robots, PRODUCTION_HOSTS } from '../ssr/entry-server.js'

// Every page, robots.txt and sitemap.xml come through here (see the rewrite in vercel.json).
// Pages are rendered on the server into the built index.html, so search engines and link
// previews get the full content and the right <head>; the browser then hydrates them.
// ssr/ is created by `npm run build` (scripts/postbuild.mjs moves index.html there).

const template = readFileSync(join(process.cwd(), 'ssr/template.html'), 'utf8')

// Pages are cached briefly: the admin page can't purge the CDN, so an edit or a deletion
// shows within about two minutes.
const CACHE = {
  page: 'public, max-age=0, s-maxage=60, stale-while-revalidate=60',
  missing: 'public, max-age=0, s-maxage=60',
  none: 'no-store',
}

// The rewrite hands the path over as a query value, which arrives decoded. Re-encode what the
// browser keeps encoded in location.pathname, so the server renders the page the browser
// hydrates (an encoded ? or # must not turn into a query or a fragment here).
const encodePath = (path) => path.replace(/[%?#\s]|[^\x00-\x7F]/gu, (c) => encodeURIComponent(c))

export default async function handler(req, res) {
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim()
  const { path = '/', ...query } = req.query
  const search = new URLSearchParams(query).toString()
  const url = `${encodePath(path)}${search ? `?${search}` : ''}`
  const production = PRODUCTION_HOSTS.includes(host)

  // previews and *.vercel.app addresses stay out of search results
  if (!production) res.setHeader('X-Robots-Tag', 'noindex')

  try {
    if (path === '/robots.txt') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.setHeader('Cache-Control', CACHE.page)
      return res.status(200).send(production ? robots(host) : 'User-agent: *\nDisallow: /\n')
    }

    if (path === '/sitemap.xml') {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8')
      res.setHeader('Cache-Control', CACHE.page)
      return res.status(200).send(await sitemap(host))
    }

    const page = await render({ url, host })
    // Replacement functions, not strings: in a replacement string `$&`, `$'` and `$$` are
    // patterns, and post text (or React's escaping of it, `$&quot;`) can contain them.
    const html = template
      .replace(/<html[^>]*>/, () => `<html lang="${page.language}" dir="${page.language === 'he' ? 'rtl' : 'ltr'}">`)
      .replace(/<title>[\s\S]*?<\/title>/, () => page.head)
      .replace('<div id="root"></div>', () => `<div id="root">${page.html}</div>${page.dataScript}`)

    if (page.noindex) res.setHeader('X-Robots-Tag', 'noindex')
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', path === '/admin' ? CACHE.none : page.status === 200 ? CACHE.page : CACHE.missing)
    return res.status(page.status).send(html)
  } catch (error) {
    // Firestore or rendering failed. 503 tells crawlers to come back rather than index or
    // drop anything; nothing is cached.
    console.error('render failed', url, error)
    res.setHeader('Cache-Control', CACHE.none)
    res.setHeader('Retry-After', '120')
    if (path === '/sitemap.xml') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      return res.status(503).send('Sitemap temporarily unavailable\n')
    }
    // the bare app still renders itself in the browser
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    return res.status(503).send(template)
  }
}
