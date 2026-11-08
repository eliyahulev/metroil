import React, { createContext, useContext, useState, useEffect, startTransition } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

// Every visit starts in the domain's language (initialLanguage, the same on the server
// and in the browser); a choice from the switcher lasts for the rest of that visit only
// (sessionStorage), so metroisrael.com always opens in English.
const STORAGE_KEY = 'languageChoice'

const getSavedLanguage = () => {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    return saved === 'he' || saved === 'en' ? saved : null
  } catch {
    return null
  }
}

export const LanguageProvider = ({ initialLanguage, children }) => {
  const [language, setLanguageState] = useState(initialLanguage)

  // After the first render, so the browser's first render matches the server's HTML. As a
  // transition: an urgent update would reach the page's Suspense boundary before it has
  // hydrated, and React would throw away the server HTML (a blank page until the chunk loads).
  useEffect(() => {
    const saved = getSavedLanguage()
    if (saved && saved !== initialLanguage) startTransition(() => setLanguageState(saved))
  }, [initialLanguage])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr'
  }, [language])

  const setLanguage = (lang) => {
    setLanguageState(lang)
    try {
      sessionStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Storage unavailable: the choice lasts for this page view only.
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
