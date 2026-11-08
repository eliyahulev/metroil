import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import { usePageMeta } from '../hooks/usePageMeta'

function NotFound() {
  const { language } = useLanguage()
  const t = translations[language]
  usePageMeta()

  return (
    <div className="app">
      <Header />
      <section className="section page-section">
        <div className="container">
          <div className="not-found">
            <h1>{t.notFound.title}</h1>
            <p>{t.notFound.text}</p>
            <Link to="/" className="text-link">{t.notFound.home}</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default NotFound
