import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language')
    return saved || 'he'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr'
  }, [language])

  useEffect(() => {
    const saved = localStorage.getItem('language')
    const initialLanguage = saved || 'he'
    document.documentElement.lang = initialLanguage
    document.documentElement.dir = initialLanguage === 'he' ? 'rtl' : 'ltr'
  }, [])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'he' ? 'en' : 'he')
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

