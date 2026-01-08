import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

function News() {
  const { language } = useLanguage()
  const t = translations[language]
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setPosts(postsData)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className="app">
      <Header />
      <section className="section news-page">
        <div className="container">
          <h1 className="section-title">{t.news.title}</h1>
          <p className="section-description">{t.news.description}</p>

          {loading ? (
            <div className="loading">{t.news.loading}</div>
          ) : posts.length === 0 ? (
            <div className="no-posts">{t.news.noPosts}</div>
          ) : (
            <div className="news-grid">
              {posts.map(post => (
                <Link to={`/news/${post.id}`} key={post.id} className="news-card">
                  {post.image && (
                    <div className="news-card-image">
                      <img src={post.image} alt={post.title[language] || post.title.he} />
                    </div>
                  )}
                  <div className="news-card-content">
                    <h3 className="news-card-title">
                      {post.title[language] || post.title.he}
                    </h3>
                    <p className="news-card-excerpt">
                      {post.excerpt[language] || post.excerpt.he}
                    </p>
                    <span className="news-card-date">
                      {post.createdAt?.toDate?.().toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default News
