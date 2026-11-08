import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { render, sitemap, robots, PRODUCTION_HOSTS } from '../ssr/entry-server.js'

// Every page, robots.txt and sitemap.xml come through here (see the rewrite in vercel.json).
// Pages are rendered on the server into the built index.html, so search engines and link
// previews get the full content and the right <head>; the browser then hydrates them.
// ssr/ is created by `npm run build` (scripts/postbuild.mjs moves index.html there).

const template = readFileSync(join(process.cwd(), 'ssr/template.html'), 'utf8')

const CACHE = {
  page: 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
  missing: 'public, max-age=0, s-maxage=60',
  none: 'no-store',
}

export default async function handler(req, res) {
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim()
  const { path = '/', ...query } = req.query
  const search = new URLSearchParams(query).toString()
  const url = `${path}${search ? `?${search}` : ''}`
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
    const html = template
      .replace(/<html[^>]*>/, `<html lang="${page.language}" dir="${page.language === 'he' ? 'rtl' : 'ltr'}">`)
      .replace(/<title>[\s\S]*?<\/title>/, page.head)
      .replace('<div id="root"></div>', `<div id="root">${page.html}</div>${page.dataScript}`)

    if (page.noindex) res.setHeader('X-Robots-Tag', 'noindex')
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', path === '/admin' ? CACHE.none : page.status === 200 ? CACHE.page : CACHE.missing)
    return res.status(page.status).send(html)
  } catch (error) {
    // Firestore or rendering failed: send the bare app, which renders itself in the browser.
    console.error('render failed', url, error)
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', CACHE.none)
    return res.status(200).send(template)
  }
}
