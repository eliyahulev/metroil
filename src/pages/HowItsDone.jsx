import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

function HowItsDone() {
  const { language } = useLanguage()
  const t = translations[language]

  const timelineItems = [
    {
      step: '01',
      title: t.howItsDone.timeline.step1.title,
      description: t.howItsDone.timeline.step1.description,
    },
    {
      step: '02',
      title: t.howItsDone.timeline.step2.title,
      description: t.howItsDone.timeline.step2.description,
    },
    {
      step: '03',
      title: t.howItsDone.timeline.step3.title,
      description: t.howItsDone.timeline.step3.description,
    },
    {
      step: '04',
      title: t.howItsDone.timeline.step4.title,
      description: t.howItsDone.timeline.step4.description,
    },
    {
      step: '05',
      title: t.howItsDone.timeline.step5.title,
      description: t.howItsDone.timeline.step5.description,
    },
  ]

  return (
    <div className="app">
      <Header />
      <section className="section timeline-section" style={{ paddingTop: '6rem' }}>
        <div className="container">
          <h2 className="section-title">{t.howItsDone.title}</h2>
          <p className="section-description">
            {t.howItsDone.description}
          </p>
          <div className="timeline">
            {timelineItems.map((item, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}>
                <div className="timeline-marker">
                  <div className="timeline-step">{item.step}</div>
                  <div className="timeline-line"></div>
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="info-content" style={{ marginTop: '4rem' }}>
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
