import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

// showClose: the home page ends on the main action above the links
function Footer({ showClose = false }) {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="footer">
      <div className="container">
        {showClose && (
          <div className="footer-close">
            <div className="footer-close-head">
              <h2>{t.home.close.title}</h2>
              <p>{t.home.close.text}</p>
            </div>
            <Link to="/news" className="btn btn-primary btn-xl">
              {t.header.mainAction}
              <span className="btn-arrow" aria-hidden="true" />
            </Link>
          </div>
        )}
        <div className="footer-links">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-mark" aria-hidden="true"><i></i><i></i><i></i></span>
              {t.header.logo}
            </Link>
            <p className="footer-lede">{t.footer.lede}</p>
          </div>
          <nav className="footer-nav" aria-label={t.header.logo}>
            <Link to="/news" className="footer-link">{t.header.nav.news}</Link>
            <Link to="/#lines" className="footer-link">{t.header.nav.lines}</Link>
            <Link to="/#project" className="footer-link">{t.header.nav.project}</Link>
            <Link to="/how-its-done" className="footer-link">{t.header.nav.howItsDone}</Link>
            <Link to="/privacy" className="footer-link">{t.footer.privacy}</Link>
            <Link to="/accessibility" className="footer-link">{t.footer.accessibility}</Link>
          </nav>
        </div>
        <div className="footer-legal">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p className="footer-credit">{t.footer.credit}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
