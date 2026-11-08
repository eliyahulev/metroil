import vercelConfig from '../../vercel.json'

// Vercel's image optimizer (/_vercel/image) resizes images to the width they're shown at and
// converts them to AVIF/WebP. It exists only on Vercel, so the dev server uses the originals.
// What it accepts — widths, quality and which URLs — is read from vercel.json's `images`
// block, so the two can't disagree; any other URL is used as it is.

const { sizes: WIDTHS, qualities, localPatterns = [], remotePatterns = [] } = vercelConfig.images
const QUALITY = qualities[0]
const OPTIMIZE = import.meta.env.PROD

const allowed = (src) => {
  if (src.startsWith('/') && !src.startsWith('//')) {
    const [pathname, search = ''] = src.split('?')
    return localPatterns.some(p =>
      new RegExp(p.pathname).test(pathname) && (p.search === undefined || p.search === (search && `?${search}`))
    )
  }
  let url
  try {
    url = new URL(src)
  } catch {
    return false
  }
  return remotePatterns.some(p =>
    (!p.protocol || url.protocol === `${p.protocol}:`) &&
    new RegExp(p.hostname).test(url.hostname) &&
    (!p.pathname || new RegExp(p.pathname).test(url.pathname))
  )
}

const optimizable = (src) => OPTIMIZE && typeof src === 'string' && allowed(src)

export const imageUrl = (src, width) =>
  optimizable(src) ? `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${QUALITY}` : src

// props for <img>: a small src for old browsers, and every width for the browser to pick from
export const responsiveImage = (src, sizes, fallbackWidth = 960) =>
  optimizable(src)
    ? { src: imageUrl(src, fallbackWidth), srcSet: WIDTHS.map(w => `${imageUrl(src, w)} ${w}w`).join(', '), sizes }
    : { src }
