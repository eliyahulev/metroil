import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

const SECTIONS = ['news', 'lines', 'project', 'how', 'contact']

function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-mark" aria-hidden="true"><i></i><i></i><i></i></span>
              {t.header.logo}
            </Link>
            <p className="footer-lede">{t.footer.lede}</p>
          </div>
          <nav className="footer-nav" aria-label={t.header.logo}>
            {SECTIONS.map(id => (
              <Link key={id} to={`/#${id}`} className="footer-link">{t.header.nav[id]}</Link>
            ))}
          </nav>
        </div>
        <div className="footer-legal">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <nav className="footer-legal-links" aria-label={t.footer.legalLabel}>
            <Link to="/privacy" className="footer-link">{t.footer.privacy}</Link>
            <Link to="/accessibility" className="footer-link">{t.footer.accessibility}</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
