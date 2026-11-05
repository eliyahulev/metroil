import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

// An open tile: the photograph, then the date and the headline on the page ground.
function NewsCard({ post, showExcerpt = false }) {
  const { language } = useLanguage()
  const t = translations[language]
  const [imageFailed, setImageFailed] = useState(false)
  const title = post.title[language] || post.title.he
  const date = post.createdAt?.toDate?.()

  return (
    <Link to={`/news/${post.id}`} className="tile">
      <div className={`tile-media${!post.image || imageFailed ? ' tile-media-empty' : ''}`}>
        {post.image && !imageFailed ? (
          <img src={post.image} alt="" loading="lazy" onError={() => setImageFailed(true)} />
        ) : (
          <span aria-hidden="true">{t.header.logo}</span>
        )}
      </div>
      {date && (
        <time className="tile-date" dateTime={date.toISOString()}>
          {date.toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')}
        </time>
      )}
      <h3 className="tile-title">{title}</h3>
      {showExcerpt && (
        <p className="tile-excerpt">{post.excerpt[language] || post.excerpt.he}</p>
      )}
    </Link>
  )
}

export default NewsCard
