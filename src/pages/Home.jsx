import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NewsCard from '../components/NewsCard'
import HowSteps from '../components/HowSteps'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import { useInitialData } from '../contexts/InitialData'
import { usePageMeta } from '../hooks/usePageMeta'
import { fetchPosts } from '../lib/posts'
import { responsiveImage } from '../lib/images'
import heroImage from '../assets/hero.jpeg'
import mapImage from '../assets/map.jpg'

// the hero's line bars are drawn to scale against the longest line
const LONGEST_LINE_KM = 85

function Home() {
  const { language } = useLanguage()
  const t = translations[language]
  const { cost, tenders } = t.home.project

  const initial = useInitialData()
  const [posts, setPosts] = useState(initial?.posts ?? [])
  usePageMeta()

  useEffect(() => {
    if (initial?.posts) return
    fetchPosts(3)
      .then(setPosts)
      .catch(error => console.error('Error fetching posts:', error))
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
            <h1 id="hero-title" className="hero-title">{t.home.hero.title}</h1>
            <div className="hero-facts" role="group" aria-label={t.home.hero.factsLabel}>
              <dl className="hero-stats">
                {t.home.hero.stats.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="hero-lines">
                {t.home.lines.items.map(line => (
                  <li key={line.id}>
                    <span className={`line-badge line-${line.id}`}>{line.name}</span>
                    <span className="hero-line-track" aria-hidden="true">
                      <span className={`hero-line-bar line-${line.id}`} style={{ inlineSize: `${(line.km / LONGEST_LINE_KM) * 100}%` }} />
                    </span>
                    <span className="hero-line-value">{t.home.hero.lineDetail(line.km, line.stations)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="btn-row">
              <Link to="/#news" className="btn btn-primary">
                {t.header.mainAction}
                <span className="btn-arrow" aria-hidden="true" />
              </Link>
              <a href="#lines" className="btn btn-text">{t.home.hero.secondary}</a>
            </div>
          </div>
          <div className="hero-media">
            <img {...responsiveImage(heroImage, '(max-width: 1023px) 100vw, 50vw', 1280)} alt={t.home.hero.alt} width="1600" height="627" fetchpriority="high" />
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

      {/* always rendered, so the News link has somewhere to land; the tiles arrive from Firestore */}
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
                  <span className="rows-value">{t.home.lines.km(line.km)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="split-media split-media-map">
            <img {...responsiveImage(mapImage, '(max-width: 1023px) 100vw, 40vw', 640)} alt={t.home.lines.mapAlt} width="632" height="1164" loading="lazy" />
          </div>
        </div>
      </section>

      <section id="project" className="section section-surface" aria-labelledby="project-title">
        <div className="container">
          <div className="section-head">
            <h2 id="project-title" className="section-title">{t.home.project.title}</h2>
            <p className="section-description">{t.home.project.description}</p>
          </div>
          <div className="project-board">
            <div className="project-cost">
              <p className="project-label">{cost.label}</p>
              <p className="project-figure">{cost.value} <span>{cost.unit}</span></p>
              <div className="project-bar" aria-hidden="true">
                <span style={{ inlineSize: `${(tenders.billions / cost.billions) * 100}%` }} />
              </div>
              <p className="project-legend">
                <span className="project-swatch" aria-hidden="true" />
                {tenders.label}: <strong>{tenders.value}</strong>
              </p>
            </div>
            {t.home.project.stats.map(([value, label]) => (
              <div key={label} className="project-stat">
                <p className="project-figure">{value}</p>
                <p className="project-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="section" aria-labelledby="how-title">
        <div className="container">
          <div className="section-head">
            <h2 id="how-title" className="section-title">{t.howItsDone.title}</h2>
            <p className="section-description">{t.howItsDone.description}</p>
          </div>
          <HowSteps />
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

      <Footer />
    </div>
  )
}

export default Home
