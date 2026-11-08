import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import { useInitialData } from '../contexts/InitialData'
import { usePageMeta } from '../hooks/usePageMeta'
import { fetchPost, formatDate, localized } from '../lib/posts'
import { responsiveImage } from '../lib/images'

function Post() {
  const { id } = useParams()
  const { language } = useLanguage()
  const t = translations[language]
  // undefined: not known yet; null: no such post
  const initial = useInitialData()
  const [post, setPost] = useState(initial && 'post' in initial ? initial.post : undefined)
  const loading = post === undefined
  usePageMeta({ post })

  useEffect(() => {
    if (initial && 'post' in initial) {
      setPost(initial.post)
      return
    }
    setPost(undefined)
    fetchPost(id)
      .then(setPost)
      .catch(error => {
        console.error('Error fetching post:', error)
        setPost(null)
      })
  }, [id])

  if (loading) {
    return (
      <div className="app">
        <Header />
        <section className="section page-section">
          <div className="container">
            <div className="loading">{t.news.loading}</div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="app">
        <Header />
        <section className="section page-section">
          <div className="container">
            <div className="not-found">
              <h1>{t.news.notFound}</h1>
              <Link to="/news" className="back-link">{t.news.backToNews}</Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <article className="section page-section post-page">
        <div className="container">
          <Link to="/news" className="back-link">{t.news.backToNews}</Link>

          <header className="post-header">
            <h1 className="post-title">{localized(post.title, language)}</h1>
            {post.createdAt && (
              <time className="post-date" dateTime={post.createdAt.toISOString()}>
                {formatDate(post.createdAt, language)}
              </time>
            )}
          </header>

          {post.image && (
            <div className="post-image">
              <img
                {...responsiveImage(post.image, '(max-width: 760px) 100vw, 760px', 1280)}
                fetchpriority="high"
                alt={localized(post.title, language)}
                onError={(e) => { e.currentTarget.parentElement.hidden = true }}
              />
            </div>
          )}

          <div className="post-content">
            {localized(post.content, language).split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
      <Footer />
    </div>
  )
}

export default Post
