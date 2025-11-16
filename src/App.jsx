import React, { useState } from 'react'
import './App.css'
import heroImage from './assets/hero.jpeg'
import mapImage from './assets/map.jpg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navItems = [
    { href: '#about', label: 'אודות' },
    { href: '#project', label: 'הפרויקט' },
    { href: '#stats', label: 'נתונים' },
    { href: '#lines', label: 'קווים' },
    { href: '#cities', label: 'ערים' },
  ]

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1 className="logo">מטרו ישראל</h1>
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
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-image-wrapper">
          <img src={heroImage} alt="תחנת מטרו ישראל" className="hero-image" />
          <div className="hero-overlay">
            <div className="hero-content">
              <h2 className="hero-title">מטרו ישראל</h2>
              <p className="hero-subtitle">פרויקט התחבורה הגדול בישראל</p>
              <p className="hero-description">
                חיבור גוש דן באמצעות רשת מטרו מודרנית ויעילה
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">אודות הפרויקט</h2>
          <div className="content-grid">
            <div className="content-card">
              <h3>חזון הפרויקט</h3>
              <p>
                פרויקט המטרו אמור להביא מזור משמעותי לגוש הדן העמוס והפקוק.
                המטרו צפוי לחבר בין 24 רשויות, אזורי תעסוקה, מוסדות חינוך ורפואה
                ומוקדי מגורים, ולהפוך את התחבורה הציבורית לנגישה ויעילה יותר.
              </p>
            </div>
            <div className="content-card">
              <h3>היקף הפרויקט</h3>
              <p>
                הפרויקט כולל שלושה קווים עיקריים שיפעלו ברחבי גוש דן, עם 300 ק"מ
                של מנהרות ו-109 תחנות תת-קרקעיות. לפי נת"ע, עתידות להתבצע בהם
                כ-600 מיליון נסיעות בשנה.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="section stats-section">
        <div className="container">
          <h2 className="section-title">נתוני הפרויקט</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">3</div>
              <div className="stat-label">קווים</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24</div>
              <div className="stat-label">רשויות מקומיות</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">300</div>
              <div className="stat-label">ק"מ מנהרות</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">109</div>
              <div className="stat-label">תחנות תת-קרקעיות</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">600M</div>
              <div className="stat-label">נסיעות בשנה</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10B</div>
              <div className="stat-label">₪ שווי הפקעות</div>
            </div>
          </div>
        </div>
      </section>

      <section id="lines" className="section lines-section">
        <div className="container">
          <h2 className="section-title">קווי המטרו</h2>
          <p className="section-description">
            שלושת קווי המטרו שיחברו את גוש דן
          </p>
          <div className="lines-content">
            <div className="lines-info">
              <div className="line-card">
                <div className="line-header">
                  <span className="line-number">M1</span>
                  <h3 className="line-title">קו M1</h3>
                </div>
                <div className="line-details">
                  <div className="line-length">
                    <span className="length-value">85</span>
                    <span className="length-unit">קילומטר</span>
                  </div>
                </div>
              </div>
              <div className="line-card">
                <div className="line-header">
                  <span className="line-number">M2</span>
                  <h3 className="line-title">קו M2</h3>
                </div>
                <div className="line-details">
                  <div className="line-length">
                    <span className="length-value">26</span>
                    <span className="length-unit">קילומטר</span>
                  </div>
                </div>
              </div>
              <div className="line-card">
                <div className="line-header">
                  <span className="line-number">M3</span>
                  <h3 className="line-title">קו M3</h3>
                </div>
                <div className="line-details">
                  <div className="line-length">
                    <span className="length-value">39</span>
                    <span className="length-unit">קילומטר</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="map-container">
              <img src={mapImage} alt="מפת קווי המטרו" className="metro-map" />
            </div>
          </div>
        </div>
      </section>

      <section id="cities" className="section">
        <div className="container">
          <h2 className="section-title">הערים המחוברות</h2>
          <p className="section-description">
            הפרויקט יחבר את הערים הבאות בגוש דן:
          </p>
          <div className="cities-grid">
            <div className="city-card">תל אביב</div>
            <div className="city-card">רמת גן</div>
            <div className="city-card">גבעתיים</div>
            <div className="city-card">חולון</div>
            <div className="city-card">בת ים</div>
            <div className="city-card">ראשון לציון</div>
            <div className="city-card">פתח תקווה</div>
            <div className="city-card">קריית אונו</div>
            <div className="city-card">אור יהודה</div>
            <div className="city-card">ועוד 15 רשויות</div>
          </div>
        </div>
      </section>

      <section className="section info-section">
        <div className="container">
          <h2 className="section-title">מידע נוסף</h2>
          <div className="info-content">
            <p>
              במהלך השנה החולפת נשלחו כ-21 אלף הודעות הפקעה לבעלי קרקעות על תוואי
              המסילות. ההפקעות יבוצעו בערים חולון, בת ים, אור יהודה, קריית אונו
              וראשון לציון, גבעתיים, תל אביב ופתח תקווה.
            </p>
            <p>
              הפרויקט מנוהל על ידי נת"ע (נתיבי תחבורה עירוניים) ומשרד התחבורה,
              ומציע פתרון תחבורתי מתקדם שישפר משמעותית את איכות החיים בגוש דן.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 מטרו ישראל - פרויקט התחבורה הגדול בישראל</p>
        </div>
      </footer>
    </div>
  )
}

export default App
