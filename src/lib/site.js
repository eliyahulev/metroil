// One site, two domains: Hebrew on metroisrael.co.il, English on metroisrael.com.
// Shared by the browser and the server, so both start in the same language.

export const ORIGINS = {
  he: 'https://www.metroisrael.co.il',
  en: 'https://www.metroisrael.com',
}

export const PRODUCTION_HOSTS = [
  'www.metroisrael.co.il',
  'metroisrael.co.il',
  'www.metroisrael.com',
  'metroisrael.com',
]

export const languageForHost = (host = '') =>
  host.replace(/:\d+$/, '').endsWith('metroisrael.com') ? 'en' : 'he'

// The share image and logo, served from /public at fixed paths
export const OG_IMAGE = { path: '/og-image.jpg', width: 1200, height: 630 }
export const LOGO_PATH = '/apple-touch-icon.png'
