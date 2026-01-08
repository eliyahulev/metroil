import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import heroImage from '../assets/hero.jpeg'
import mapImage from '../assets/map.jpg'

function Home() {
  const { language } = useLanguage()
  const t = translations[language]

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(3))
        const snapshot = await getDocs(q)
        setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
  }, [])

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ submitting: false, success: false, error: false })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ submitting: true, success: false, error: false })

    try {
      const response = await fetch('https://formspree.io/f/mdakqbqj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus({ submitting: false, success: true, error: false })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({ submitting: false, success: false, error: true })
      }
    } catch (error) {
      setStatus({ submitting: false, success: false, error: true })
    }
  }

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

      {posts.length > 0 && (
        <section id="news" className="section news-section">
          <div className="container">
            <h2 className="section-title">{t.news.latestNews}</h2>
            <div className="news-grid">
              {posts.map(post => (
                <Link to={`/news/${post.id}`} key={post.id} className="news-card">
                  {post.image && (
                    <div className="news-card-image">
                      <img src={post.image} alt={post.title[language] || post.title.he} />
                    </div>
                  )}
                  <div className="news-card-content">
                    <h3 className="news-card-title">
                      {post.title[language] || post.title.he}
                    </h3>
                    <p className="news-card-excerpt">
                      {post.excerpt[language] || post.excerpt.he}
                    </p>
                    <span className="news-card-date">
                      {post.createdAt?.toDate?.().toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/news" className="view-all-link">
              {t.news.viewAll} &rarr;
            </Link>
          </div>
        </section>
      )}

      <section id="contact" className="section contact-section">
        <div className="container">
          <h2 className="section-title">{t.home.contact.title}</h2>
          <p className="section-description">{t.home.contact.description}</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Honeypot field - hidden from users, catches bots */}
            <input
              type="text"
              name="_gotcha"
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />
            <div className="form-group">
              <label htmlFor="name">{t.home.contact.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.home.contact.namePlaceholder}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t.home.contact.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.home.contact.emailPlaceholder}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t.home.contact.message}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t.home.contact.messagePlaceholder}
                rows="5"
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={status.submitting}>
              {status.submitting ? t.home.contact.sending : t.home.contact.submit}
            </button>
            {status.success && <p className="form-message success">{t.home.contact.success}</p>}
            {status.error && <p className="form-message error">{t.home.contact.error}</p>}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
