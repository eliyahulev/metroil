import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-copyright">
            &copy; 2024 מטרו ישראל - פרויקט התחבורה הגדול בישראל
          </p>
          <nav className="footer-nav">
            <Link to="/privacy" className="footer-link">
              הגדרות פרטיות
            </Link>
            <Link to="/accessibility" className="footer-link">
              הגדרות נגישות
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer

