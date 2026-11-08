import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import App from './App.jsx'
import { languageForHost } from './lib/site'
import { normalizePost } from './lib/posts'
import './index.css'

// The page's data, printed into the HTML by the server (see api/render.js)
const readInitialData = () => {
  const data = window.__INITIAL_DATA__
  if (!data) return null
  return {
    ...data,
    posts: data.posts?.map(normalizePost),
    post: data.post && normalizePost(data.post),
  }
}

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App initialLanguage={languageForHost(window.location.hostname)} initialData={readInitialData()} />
    </BrowserRouter>
    <Analytics />
  </React.StrictMode>
)

const root = document.getElementById('root')

// Server-rendered pages are hydrated; the admin page and the dev server start empty.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app)
} else {
  ReactDOM.createRoot(root).render(app)
}
