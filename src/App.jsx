import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import './App.css'
import ScrollToTop from './components/ScrollToTop'

const Home = React.lazy(() => import('./pages/Home'))
const HowItsDone = React.lazy(() => import('./pages/HowItsDone'))
const Privacy = React.lazy(() => import('./pages/Privacy'))
const Accessibility = React.lazy(() => import('./pages/Accessibility'))
const News = React.lazy(() => import('./pages/News'))
const Post = React.lazy(() => import('./pages/Post'))
const Admin = React.lazy(() => import('./pages/Admin'))

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-its-done" element={<HowItsDone />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<Post />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </Router>
    </LanguageProvider>
  )
}

export default App
