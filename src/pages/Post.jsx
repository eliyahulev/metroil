import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

function Post() {
  const { id } = useParams()
  const { language } = useLanguage()
  const t = translations[language]
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() })
        }
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  if (loading) {
    return (
      <div className="app">
        <Header />
        <section className="section">
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
        <section className="section">
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
      <article className="section post-page">
        <div className="container">
          <Link to="/news" className="back-link">{t.news.backToNews}</Link>

          <header className="post-header">
            <h1 className="post-title">{post.title[language] || post.title.he}</h1>
            <time className="post-date">
              {post.createdAt?.toDate?.().toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')}
            </time>
          </header>

          {post.image && (
            <div className="post-image">
              <img src={post.image} alt={post.title[language] || post.title.he} />
            </div>
          )}

          <div className="post-content">
            {(post.content[language] || post.content.he).split('\n').map((paragraph, index) => (
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
