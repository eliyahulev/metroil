import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// How long a section link keeps its target in view while the page above it is still
// loading (the lazy page chunk, then the news tiles).
const SETTLE_MS = 2500

// Runs on every navigation (location.key), so clicking the same link twice still scrolls.
// With a hash it scrolls to that section; without one, to the top.
function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  // null on the first run, so a page opened at /#section is treated like an arrival
  const prevPathname = useRef(null)
  const firstRun = useRef(true)

  useEffect(() => {
    const pathChanged = prevPathname.current !== pathname
    prevPathname.current = pathname
    const isFirstRun = firstRun.current
    firstRun.current = false

    if (!hash) {
      // On the first run the page came from the server: leave the scroll where the browser
      // put it (restored on reload or Back, or already moved by the reader).
      if (!isFirstRun) window.scrollTo({ top: 0, behavior: pathChanged ? 'instant' : 'smooth' })
      return
    }

    let target = null
    let userScrolled = false
    let observer = null
    const started = Date.now()

    // scroll-padding-top on <html> keeps the section clear of the sticky header
    const align = (behavior) => target.scrollIntoView({ block: 'start', behavior })

    // The visitor takes over: stop correcting the position.
    const stop = () => { userScrolled = true }
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('keydown', stop)

    const find = setInterval(() => {
      target = document.getElementById(hash.slice(1))
      if (!target && Date.now() - started < SETTLE_MS) return
      clearInterval(find)
      if (!target) return

      align(pathChanged ? 'instant' : 'smooth')

      // Content loading above the section pushes it down; follow it until things settle.
      if (pathChanged) {
        observer = new ResizeObserver(() => {
          if (!userScrolled && Date.now() - started < SETTLE_MS) align('instant')
        })
        observer.observe(document.body)
      }
    }, 30)

    return () => {
      clearInterval(find)
      observer?.disconnect()
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
    }
  }, [pathname, hash, key])

  return null
}

export default ScrollToTop
