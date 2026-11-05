import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

function NewsCard({ post }) {
  const { language } = useLanguage()
  const t = translations[language]
  const [imageFailed, setImageFailed] = useState(false)
  const title = post.title[language] || post.title.he
  const date = post.createdAt?.toDate?.()

  return (
    <Link to={`/news/${post.id}`} className="news-card">
      {post.image && !imageFailed ? (
        <div className="news-card-image">
          <img src={post.image} alt={title} loading="lazy" onError={() => setImageFailed(true)} />
        </div>
      ) : (
        <div className="news-card-image news-card-image-empty" aria-hidden="true">
          {t.header.logo}
        </div>
      )}
      <div className="news-card-content">
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-excerpt">
          {post.excerpt[language] || post.excerpt.he}
        </p>
        {date && (
          <time className="news-card-date" dateTime={date.toISOString()}>
            {date.toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')}
          </time>
        )}
      </div>
    </Link>
  )
}

export default NewsCard
