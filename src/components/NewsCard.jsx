import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import { formatDate, localized } from '../lib/posts'
import { responsiveImage } from '../lib/images'

// An open tile: the photograph, then the date and the headline on the page ground.
function NewsCard({ post, showExcerpt = false }) {
  const { language } = useLanguage()
  const t = translations[language]
  const [imageFailed, setImageFailed] = useState(false)
  const title = localized(post.title, language)
  const date = post.createdAt

  return (
    <Link to={`/news/${post.id}`} className="tile">
      <div className={`tile-media${!post.image || imageFailed ? ' tile-media-empty' : ''}`}>
        {post.image && !imageFailed ? (
          <img
            {...responsiveImage(post.image, '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px', 640)}
            alt=""
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span aria-hidden="true">{t.header.logo}</span>
        )}
      </div>
      {date && (
        <time className="tile-date" dateTime={date.toISOString()}>
          {formatDate(date, language)}
        </time>
      )}
      <h3 className="tile-title">{title}</h3>
      {showExcerpt && (
        <p className="tile-excerpt">{localized(post.excerpt, language)}</p>
      )}
    </Link>
  )
}

export default NewsCard
