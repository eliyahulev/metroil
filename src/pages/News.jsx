import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NewsCard from '../components/NewsCard'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import { useInitialData } from '../contexts/InitialData'
import { usePageMeta } from '../hooks/usePageMeta'
import { fetchPosts } from '../lib/posts'

const PAGE_SIZE = 9

function News() {
  const { language } = useLanguage()
  const t = translations[language]
  const initial = useInitialData()
  const [posts, setPosts] = useState(initial?.posts ?? [])
  const [loading, setLoading] = useState(!initial?.posts)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  usePageMeta()

  useEffect(() => {
    if (initial?.posts) return
    fetchPosts()
      .then(setPosts)
      .catch(error => console.error('Error fetching posts:', error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="app">
      <Header />
      <section className="section page-section news-page">
        <div className="container">
          <h1 className="section-title">{t.news.title}</h1>
          <p className="section-description">{t.news.description}</p>

          {loading ? (
            <div className="loading">{t.news.loading}</div>
          ) : posts.length === 0 ? (
            <div className="no-posts">{t.news.noPosts}</div>
          ) : (
            <>
              <div className="tile-grid">
                {posts.slice(0, visibleCount).map(post => (
                  <NewsCard key={post.id} post={post} showExcerpt />
                ))}
              </div>
              {visibleCount < posts.length && (
                <div className="news-load-more">
                  <button
                    type="button"
                    className="btn btn-secondary"
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
