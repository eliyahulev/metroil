import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import LanguageSwitcher from './LanguageSwitcher'

function Header() {
  const { language } = useLanguage()
  const t = translations[language]
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navItems = [
    { path: '/news', label: t.header.nav.news },
    { href: '#lines', label: t.header.nav.lines },
    { href: '#project', label: t.header.nav.project },
    { path: '/how-its-done', label: t.header.nav.howItsDone },
    { href: '#contact', label: t.header.nav.contact },
  ]

  const closeMenu = () => setIsMenuOpen(false)

  const handleLogoClick = (e) => {
    e.preventDefault()
    closeMenu()
    if (location.pathname !== '/') {
      navigate('/')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.replaceState(null, '', '/')
  }

  const scrollToSection = (hash) => {
    const scrollToElement = () => {
      const element = document.querySelector(hash)
      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        return true
      }
      return false
    }

    if (scrollToElement()) {
      return
    }

    let attempts = 0
    const maxAttempts = 10
    const interval = setInterval(() => {
      attempts++
      if (scrollToElement() || attempts >= maxAttempts) {
        clearInterval(interval)
      }
    }, 50)
  }

  const handleSectionClick = (href, e) => {
    e.preventDefault()
    closeMenu()
    
    if (location.pathname !== '/') {
      navigate('/' + href)
    } else {
      scrollToSection(href)
      window.history.pushState(null, '', href)
    }
  }

  return (
    <header className={`header${isMenuOpen ? ' menu-open' : ''}`}>
      <div className="container header-bar">
        <Link to="/" onClick={handleLogoClick} className="logo">
          <span className="logo-mark" aria-hidden="true"><i></i><i></i><i></i></span>
          {t.header.logo}
        </Link>
        <nav className={`nav${isMenuOpen ? ' open' : ''}`} aria-label={t.header.menuLabel}>
          {navItems.map((item, index) => (
            item.href ? (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleSectionClick(item.href, e)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={index}
                to={item.path}
                onClick={closeMenu}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          ))}
          <Link to="/news" className="btn btn-primary nav-menu-action" onClick={closeMenu}>
            {t.header.mainAction}
          </Link>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher />
          <Link to="/news" className="btn btn-primary header-action" onClick={closeMenu}>
            {t.header.mainAction}
          </Link>
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

