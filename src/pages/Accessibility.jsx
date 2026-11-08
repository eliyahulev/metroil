import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import { usePageMeta } from '../hooks/usePageMeta'

function Accessibility() {
  const { language } = useLanguage()
  const t = translations[language]
  usePageMeta()

  return (
    <div className="app">
      <Header />
      <section className="section page-section">
        <div className="container">
          <h1 className="section-title">{t.accessibility.title}</h1>
          <div className="info-content">
            {t.accessibility.content.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Accessibility
