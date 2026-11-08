import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import LanguageSwitcher from './LanguageSwitcher'

// Every item is a section of the home page; ScrollToTop scrolls to it, from any page.
const SECTIONS = ['news', 'lines', 'project', 'how', 'contact']

function Header() {
  const { language } = useLanguage()
  const t = translations[language]
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`header${isMenuOpen ? ' menu-open' : ''}`}>
      <div className="container header-bar">
        <Link to="/" onClick={closeMenu} className="logo">
          <span className="logo-mark" aria-hidden="true"><i></i><i></i><i></i></span>
          {t.header.logo}
        </Link>
        <nav className={`nav${isMenuOpen ? ' open' : ''}`} aria-label={t.header.menuLabel}>
          {SECTIONS.map(id => (
            <Link key={id} to={`/#${id}`} onClick={closeMenu}>
              {t.header.nav[id]}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher />
          <button
            className={`nav-toggle${isMenuOpen ? ' open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={t.header.menuLabel}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
