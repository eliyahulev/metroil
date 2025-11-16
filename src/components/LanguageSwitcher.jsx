import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="language-switcher"
      aria-label={language === 'he' ? 'Switch to English' : 'עבור לעברית'}
    >
      {language === 'he' ? 'EN' : 'עב'}
    </button>
  )
}

export default LanguageSwitcher

