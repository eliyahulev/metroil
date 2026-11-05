import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../translations'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

// Only an explicit choice from the switcher is stored, so the domain default
// applies until the visitor picks a language. (The old 'language' key was
// written on every visit, so it is ignored.)
const STORAGE_KEY = 'languageChoice'

// metroisrael.com defaults to English; metroisrael.co.il and everything else to Hebrew.
const getDomainLanguage = () =>
  window.location.hostname.endsWith('metroisrael.com') ? 'en' : 'he'

const getSavedLanguage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'he' || saved === 'en' ? saved : null
  } catch {
    return null
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => getSavedLanguage() || getDomainLanguage())

  useEffect(() => {
    const t = translations[language]
    document.documentElement.lang = language
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr'
    document.title = `${t.header.logo} - ${t.home.hero.subtitle}`
  }, [language])

  const setLanguage = (lang) => {
    setLanguageState(lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Storage unavailable (private mode etc.) — the choice lasts for this page view only.
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'he' ? 'en' : 'he')
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

