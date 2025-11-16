import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import LanguageSwitcher from './LanguageSwitcher'

function Header() {
  const { language } = useLanguage()
  const t = translations[language]
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navItems = [
    { href: '#project', label: t.header.nav.about },
    { href: '#project', label: t.header.nav.project },
    { href: '#stats', label: t.header.nav.stats },
    { href: '#lines', label: t.header.nav.lines },
    { href: '#cities', label: t.header.nav.cities },
    { path: '/how-its-done', label: t.header.nav.howItsDone },
  ]

  const closeMenu = () => setIsMenuOpen(false)

  const handleSectionClick = (href) => {
    closeMenu()
    if (location.pathname !== '/') {
      window.location.href = `/${href}`
    }
  }

  return (
    <header className="header">
      <div className="container">
        <Link to="/" onClick={closeMenu} style={{ textDecoration: 'none' }}>
          <h1 className="logo">{t.header.logo}</h1>
        </Link>
        <button
          className={`nav-toggle${isMenuOpen ? ' open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={t.header.menuLabel}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`nav${isMenuOpen ? ' open' : ''}`}>
          {navItems.map((item, index) => (
            item.href ? (
              <a
                key={index}
                href={item.href}
                onClick={() => handleSectionClick(item.href)}
              >
                {item.label}
              </a>
            ) : (
              <Link key={index} to={item.path} onClick={closeMenu}>
                {item.label}
              </Link>
            )
          ))}
          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', marginTop: '0.5rem' }}>
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header

