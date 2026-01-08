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
    { href: '#project', label: t.header.nav.about },
    { href: '#project', label: t.header.nav.project },
    { href: '#stats', label: t.header.nav.stats },
    { href: '#lines', label: t.header.nav.lines },
    { href: '#cities', label: t.header.nav.cities },
    { path: '/how-its-done', label: t.header.nav.howItsDone },
    { path: '/news', label: t.header.nav.news },
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
    <header className="header">
      <div className="container">
        <Link to="/" onClick={handleLogoClick} style={{ textDecoration: 'none' }}>
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
                onClick={(e) => handleSectionClick(item.href, e)}
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

