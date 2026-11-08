import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HowSteps from '../components/HowSteps'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

function HowItsDone() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="app">
      <Header />
      <section className="section timeline-section page-section">
        <div className="container">
          <h1 className="section-title">{t.howItsDone.title}</h1>
          <p className="section-description">
            {t.howItsDone.description}
          </p>
          <HowSteps />
          <div className="info-content timeline-summary">
            <p>
              <strong>{t.howItsDone.process.title}</strong> {t.howItsDone.process.text}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HowItsDone
