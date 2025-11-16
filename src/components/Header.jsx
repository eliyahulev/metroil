import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navItems = [
    { href: '#project', label: 'אודות' },
    { href: '#project', label: 'הפרויקט' },
    { href: '#stats', label: 'נתונים' },
    { href: '#lines', label: 'קווים' },
    { href: '#cities', label: 'ערים' },
    { path: '/how-its-done', label: 'איך זה נעשה' },
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
          <h1 className="logo">מטרו ישראל</h1>
        </Link>
        <button
          className={`nav-toggle${isMenuOpen ? ' open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="פתח תפריט ניווט"
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
        </nav>
      </div>
    </header>
  )
}

export default Header

