import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { InitialDataProvider } from './contexts/InitialData'
import './App.css'
import ScrollToTop from './components/ScrollToTop'
import CookieNotice from './components/CookieNotice'

const Home = React.lazy(() => import('./pages/Home'))
const HowItsDone = React.lazy(() => import('./pages/HowItsDone'))
const Privacy = React.lazy(() => import('./pages/Privacy'))
const Accessibility = React.lazy(() => import('./pages/Accessibility'))
const News = React.lazy(() => import('./pages/News'))
const Post = React.lazy(() => import('./pages/Post'))
const Admin = React.lazy(() => import('./pages/Admin'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

// The router comes from the entry: BrowserRouter in entry-client, StaticRouter in entry-server.
function App({ initialLanguage, initialData }) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <InitialDataProvider value={initialData}>
        <ScrollToTop />
        <Suspense fallback={<div className="app" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-its-done" element={<HowItsDone />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<Post />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <CookieNotice />
      </InitialDataProvider>
    </LanguageProvider>
  )
}

export default App
