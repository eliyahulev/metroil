// `npm run preview`: serves the production build the way Vercel does — files from dist/
// first, every other path through api/render.js. (`vite preview` can't: the build moves
// index.html into ssr/ for the server render.)
// PREVIEW_HOST=www.metroisrael.com npm run preview  renders the English site.
import http from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'
import handler from '../api/render.js'

const PORT = Number(process.env.PORT) || 4173
const TYPES = {
  '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2',
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')

  // no image optimizer locally: send the original
  if (url.pathname === '/_vercel/image') {
    res.writeHead(302, { Location: url.searchParams.get('url') })
    return res.end()
  }

  const file = join('dist', decodeURIComponent(url.pathname))
  if (url.pathname !== '/' && existsSync(file) && statSync(file).isFile()) {
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' })
    return res.end(readFileSync(file))
  }

  // what Vercel's rewrite and helpers give the function
  if (process.env.PREVIEW_HOST) req.headers['x-forwarded-host'] = process.env.PREVIEW_HOST
  req.query = { ...Object.fromEntries(url.searchParams), path: decodeURIComponent(url.pathname) }
  res.status = (code) => { res.statusCode = code; return res }
  res.send = (body) => res.end(body)
  await handler(req, res)
}).listen(PORT, () => console.log(`Preview: http://localhost:${PORT}`))
