import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-copyright">
            &copy; {t.footer.copyright}
          </p>
          <nav className="footer-nav">
            <Link to="/privacy" className="footer-link">
              {t.footer.privacy}
            </Link>
            <Link to="/accessibility" className="footer-link">
              {t.footer.accessibility}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer

