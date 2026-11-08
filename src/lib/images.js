// Vercel's image optimizer (/_vercel/image, configured in vercel.json) resizes images to the
// width they're shown at and converts them to AVIF/WebP. It exists only on Vercel, so the
// dev server uses the originals. Hosts the optimizer isn't allowed to fetch keep their URL.

const WIDTHS = [640, 960, 1280, 1920]
const OPTIMIZE = import.meta.env.PROD

const optimizable = (src) =>
  OPTIMIZE && (src.startsWith('/') || src.startsWith('https://firebasestorage.googleapis.com/'))

export const imageUrl = (src, width) =>
  optimizable(src) ? `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=75` : src

// props for <img>: a small src for old browsers, and every width for the browser to pick from
export const responsiveImage = (src, sizes, fallbackWidth = 960) =>
  optimizable(src)
    ? { src: imageUrl(src, fallbackWidth), srcSet: WIDTHS.map(w => `${imageUrl(src, w)} ${w}w`).join(', '), sizes }
    : { src }
