import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

function Privacy() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="app">
      <Header />
      <section className="section" style={{ paddingTop: '6rem' }}>
        <div className="container">
          <h2 className="section-title">{t.privacy.title}</h2>
          <div className="info-content">
            {t.privacy.content.map((paragraph, index) => (
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

export default Privacy
