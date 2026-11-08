import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

const STORAGE_KEY = 'cookieNotice'

const wasDismissed = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'ok'
  } catch {
    return false
  }
}

// The site loads Google Analytics (index.html), which sets cookies; this says so once.
function CookieNotice() {
  const { language } = useLanguage()
  const t = translations[language].cookies
  // decided after the first render: the server can't know, and the first render must match it
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(!wasDismissed()), [])

  if (!open) return null

  const dismiss = () => {
    setOpen(false)
    try {
      localStorage.setItem(STORAGE_KEY, 'ok')
    } catch {
      // Storage unavailable: the notice comes back on the next visit.
    }
  }

  return (
    <div className="cookie-notice" role="region" aria-label={t.more}>
      <p>
        {t.text} <Link to="/privacy" className="cookie-link">{t.more}</Link>
      </p>
      <button type="button" className="btn btn-primary" onClick={dismiss}>
        {t.accept}
      </button>
    </div>
  )
}

export default CookieNotice
