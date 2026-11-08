import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { getPageMeta, headTags } from '../lib/seo'
import { languageForHost } from '../lib/site'

// Keeps <head> right as the visitor moves between pages or switches language.
// The server already printed the same tags for the first page, marked data-seo.
export function usePageMeta(data) {
  const { pathname } = useLocation()
  const { language } = useLanguage()
  const post = data?.post

  useEffect(() => {
    // an article still loading: keep the tags until it arrives
    if (data && 'post' in data && post === undefined) return
    const siteLanguage = languageForHost(window.location.hostname)
    const meta = getPageMeta(pathname, language, siteLanguage, { post })

    document.head.querySelectorAll('[data-seo]').forEach(el => el.remove())
    document.head.querySelectorAll('title').forEach(el => el.remove())

    for (const [tag, attrs, text] of headTags(meta, language, siteLanguage)) {
      const el = document.createElement(tag)
      for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value)
      if (text) el.textContent = text
      el.setAttribute('data-seo', '')
      document.head.appendChild(el)
    }
  }, [pathname, language, post])
}
