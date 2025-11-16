import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import heroImage from '../assets/hero.jpeg'
import mapImage from '../assets/map.jpg'

function Home() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="app">
      <Header />
      <section className="hero">
        <div className="hero-image-wrapper">
          <img src={heroImage} alt={t.home.hero.alt} className="hero-image" />
          <div className="hero-overlay">
            <div className="hero-content">
              <h2 className="hero-title">{t.home.hero.title}</h2>
              <p className="hero-subtitle">{t.home.hero.subtitle}</p>
              <p className="hero-description">
                {t.home.hero.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="project" className="section">
        <div className="container">
          <h2 className="section-title">{t.home.project.title}</h2>
          <div className="content-grid">
            <div className="content-card">
              <h3>{t.home.project.vision.title}</h3>
              <p>
                {t.home.project.vision.text}
              </p>
            </div>
            <div className="content-card">
              <h3>{t.home.project.scope.title}</h3>
              <p>
                {t.home.project.scope.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="section stats-section">
        <div className="container">
          <h2 className="section-title">{t.home.stats.title}</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">3</div>
              <div className="stat-label">{t.home.stats.lines}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24</div>
              <div className="stat-label">{t.home.stats.municipalities}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">300</div>
              <div className="stat-label">{t.home.stats.tunnels}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">109</div>
              <div className="stat-label">{t.home.stats.stations}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">600M</div>
              <div className="stat-label">{t.home.stats.trips}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">65B</div>
              <div className="stat-label">{t.home.stats.budget}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="lines" className="section lines-section">
        <div className="container">
          <h2 className="section-title">{t.home.lines.title}</h2>
          <p className="section-description">
            {t.home.lines.description}
          </p>
          <div className="lines-content">
            <div className="lines-info">
              <div className="line-card">
                <div className="line-header">
                  <span className="line-number">M1</span>
                  <h3 className="line-title">{t.home.lines.line} M1</h3>
                </div>
                <div className="line-details">
                  <div className="line-length">
                    <span className="length-value">85</span>
                    <span className="length-unit">{t.home.lines.kilometer}</span>
                  </div>
                </div>
              </div>
              <div className="line-card">
                <div className="line-header">
                  <span className="line-number">M2</span>
                  <h3 className="line-title">{t.home.lines.line} M2</h3>
                </div>
                <div className="line-details">
                  <div className="line-length">
                    <span className="length-value">26</span>
                    <span className="length-unit">{t.home.lines.kilometer}</span>
                  </div>
                </div>
              </div>
              <div className="line-card">
                <div className="line-header">
                  <span className="line-number">M3</span>
                  <h3 className="line-title">{t.home.lines.line} M3</h3>
                </div>
                <div className="line-details">
                  <div className="line-length">
                    <span className="length-value">39</span>
                    <span className="length-unit">{t.home.lines.kilometer}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="map-container">
              <img src={mapImage} alt={t.home.lines.mapAlt} className="metro-map" />
            </div>
          </div>
        </div>
      </section>

      <section id="cities" className="section">
        <div className="container">
          <h2 className="section-title">{t.home.cities.title}</h2>
          <p className="section-description">
            {t.home.cities.description}
          </p>
          <div className="cities-grid">
            {t.home.cities.cityList.map((city, index) => (
              <div key={index} className="city-card">{city}</div>
            ))}
            <div className="city-card">{t.home.cities.andMore}</div>
          </div>
        </div>
      </section>

      <section className="section info-section">
        <div className="container">
          <h2 className="section-title">{t.home.info.title}</h2>
          <div className="info-content">
            <p>
              {t.home.info.text1}
            </p>
            <p>
              {t.home.info.text2}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
