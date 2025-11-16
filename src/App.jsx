import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import './App.css'
import Home from './pages/Home'
import HowItsDone from './pages/HowItsDone'
import Privacy from './pages/Privacy'
import Accessibility from './pages/Accessibility'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-its-done" element={<HowItsDone />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/accessibility" element={<Accessibility />} />
        </Routes>
      </Router>
    </LanguageProvider>
  )
}

export default App
