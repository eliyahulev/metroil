import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const prevPathname = useRef(pathname)
  const prevHash = useRef(hash)
  const scrollTimeoutRef = useRef(null)

  useEffect(() => {
    const pathChanged = prevPathname.current !== pathname
    const hashChanged = prevHash.current !== hash
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    if (hash) {
      const scrollToElement = (instant = false) => {
        const element = document.querySelector(hash)
        if (element) {
          const headerOffset = 80
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementTop - headerOffset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: instant ? 'instant' : 'smooth'
          })
          return true
        }
        return false
      }

      if (pathChanged) {
        scrollToElement(true)
        scrollTimeoutRef.current = setTimeout(() => {
          scrollToElement(false)
        }, 50)
      } else {
        scrollToElement(false)
      }

      let attempts = 0
      const maxAttempts = 30
      const interval = setInterval(() => {
        attempts++
        if (scrollToElement(false) || attempts >= maxAttempts) {
          clearInterval(interval)
        }
      }, 50)
      
      prevPathname.current = pathname
      prevHash.current = hash
      
      return () => {
        clearInterval(interval)
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
      }
    } else if (pathChanged && !hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      prevPathname.current = pathname
      prevHash.current = hash
    } else {
      prevPathname.current = pathname
      prevHash.current = hash
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop

