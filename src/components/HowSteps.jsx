import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

// The five build stages as numbered ruled rows; on the home page and on /how-its-done.
function HowSteps() {
  const { language } = useLanguage()
  const { timeline } = translations[language].howItsDone

  return (
    <ol className="timeline">
      {Object.values(timeline).map((step, index) => (
        <li key={index} className="timeline-item">
          <span className="timeline-step">{String(index + 1).padStart(2, '0')}</span>
          <div className="timeline-content">
            <h3 className="timeline-title">{step.title}</h3>
            <p className="timeline-description">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default HowSteps
