import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NewsCard from '../components/NewsCard'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

const PAGE_SIZE = 9

function News() {
  const { language } = useLanguage()
  const t = translations[language]
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

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
            <>
              <div className="news-grid">
                {posts.slice(0, visibleCount).map(post => (
                  <NewsCard key={post.id} post={post} />
                ))}
              </div>
              {visibleCount < posts.length && (
                <div className="news-load-more">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setVisibleCount(count => count + PAGE_SIZE)}
                  >
                    {t.news.loadMore}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default News
