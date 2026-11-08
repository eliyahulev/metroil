// After the client and server builds: move the client's index.html next to the server
// bundle, as the template api/render.js fills in. Leaving it in dist/ would make Vercel
// serve "/" as a static file and skip the server render.
import { renameSync } from 'node:fs'

renameSync('dist/index.html', 'ssr/template.html')
