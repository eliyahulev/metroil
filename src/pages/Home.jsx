import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NewsCard from '../components/NewsCard'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import heroImage from '../assets/hero.jpeg'
import mapImage from '../assets/map.jpg'
import cityImage from '../assets/tlv.jpg'

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

      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-text">
            <p className="hero-notice"><span className="dot" aria-hidden="true" />{t.home.hero.notice}</p>
            <h1 id="hero-title" className="hero-title">{t.home.hero.title}</h1>
            <p className="hero-lead">{t.home.hero.lead}</p>
            <div className="btn-row">
              <Link to="/news" className="btn btn-primary">
                {t.header.mainAction}
                <span className="btn-arrow" aria-hidden="true" />
              </Link>
              <a href="#lines" className="btn btn-text">{t.home.hero.secondary}</a>
            </div>
          </div>
          <div className="hero-media">
            <img src={heroImage} alt={t.home.hero.alt} fetchpriority="high" />
            <div className="hero-float">
              <div className="hero-float-row">
                <span>{t.home.hero.factLabel}</span>
                <span>{t.home.hero.factValue}</span>
              </div>
              <p className="hero-float-title">{t.home.hero.factTitle}</p>
            </div>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section id="news" className="section section-surface" aria-labelledby="news-title">
          <div className="container">
            <div className="section-head section-head-row">
              <div>
                <h2 id="news-title" className="section-title">{t.home.news.title}</h2>
                <p className="section-description">{t.home.news.description}</p>
              </div>
              <Link to="/news" className="text-link">{t.news.viewAll}</Link>
            </div>
            <div className="tile-grid">
              {posts.map(post => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="lines" className="section" aria-labelledby="lines-title">
        <div className="container split">
          <div className="split-text">
            <div className="section-head">
              <h2 id="lines-title" className="section-title">{t.home.lines.title}</h2>
              <p className="section-description">{t.home.lines.description}</p>
            </div>
            <ul className="rows">
              {t.home.lines.items.map(line => (
                <li key={line.id}>
                  <span className={`line-badge line-${line.id}`}>{line.name}</span>
                  <span className="rows-text">{line.text}</span>
                  <span className="rows-value">{line.km}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="split-media split-media-map">
            <img src={mapImage} alt={t.home.lines.mapAlt} loading="lazy" />
          </div>
        </div>
      </section>

      <section id="project" className="section" aria-labelledby="project-title">
        <div className="container split">
          <div className="split-text">
            <div className="section-head">
              <h2 id="project-title" className="section-title">{t.home.project.title}</h2>
              <p className="section-description">{t.home.project.description}</p>
            </div>
            <ul className="rows rows-spec">
              {t.home.project.rows.map(([label, value]) => (
                <li key={label}>
                  <span className="rows-text">{label}</span>
                  <span className="rows-value">{value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="split-media">
            <img src={cityImage} alt={t.home.project.photoAlt} loading="lazy" />
          </div>
        </div>
      </section>

      <section id="contact" className="section section-surface" aria-labelledby="contact-title">
        <div className="container split">
          <div className="split-text">
            <div className="section-head">
              <h2 id="contact-title" className="section-title">{t.home.contact.title}</h2>
              <p className="section-description">{t.home.contact.description}</p>
            </div>
          </div>
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
            <button type="submit" className="btn btn-primary" disabled={status.submitting}>
              {status.submitting ? t.home.contact.sending : t.home.contact.submit}
            </button>
            {status.success && <p className="form-message success" role="status">{t.home.contact.success}</p>}
            {status.error && <p className="form-message error" role="alert">{t.home.contact.error}</p>}
          </form>
        </div>
      </section>

      <Footer showClose />
    </div>
  )
}

export default Home
