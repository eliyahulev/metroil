import React from 'react'
import Header from '../components/Header'

function HowItsDone() {
  const timelineItems = [
    {
      step: '01',
      title: 'תכנון ראשוני ואישורים',
      description: 'פרויקט המטרו הוא פרויקט התשתית הגדול ביותר במדינת ישראל, עם 109 תחנות תת־קרקעיות, 24 ערים מחוברות, ו-300 קילומטרים של מנהרות. הפרויקט כולל שלושה קווים עיקריים שיחברו את כל גוש דן.',
    },
    {
      step: '02',
      title: 'מכרזי הענק הבין־לאומיים',
      description: 'נת"ע החלה בשלב המיון המוקדם למכרזי הענק של פרויקט המטרו בגוש דן, בהיקף כ-65 מיליארד ש"ח. המכרזים מתבצעים במתכונת DB (Design Build) - תכנון ובנייה, כאשר החברות הזוכות יהיו אחראיות על התכנון המפורט והביצוע של המנהרות והתחנות התת־קרקעיות.',
    },
    {
      step: '03',
      title: 'שיתוף פעולה בין־לאומי',
      description: 'המכרזים פתוחים לחברות מובילות מהארץ ומהעולם, בעלות ניסיון מוכח בפרויקטי מטרו ותשתיות תת־קרקעיות מורכבות. החברות הזוכות יביאו עמן טכנולוגיות מתקדמות וניסיון מפרויקטים דומים ברחבי העולם.',
    },
    {
      step: '04',
      title: 'תחילת הבנייה',
      description: 'הפרויקט כולל עשרות תחנות תת־קרקעיות, מאות קילומטרים של מנהרות ואלפי עובדים מהארץ ומהעולם. על פי נת"ע, הפרויקט צפוי ליצור אלפי מקומות עבודה ולהביא למהפכה תחבורתית שתשנה את פני גוש דן.',
    },
    {
      step: '05',
      title: 'הפעלה והשקה',
      description: 'הפרויקט הוא מחולל שינוי כלכלי וחברתי, קטר שיניע את המשק קדימה ויוביל את תושבי ישראל לעתיד תחבורתי טוב יותר. המטרו הוא מחויב המציאות למען הדורות הבאים.',
    },
  ]

  return (
    <div className="app">
      <Header />
      <section className="section timeline-section" style={{ paddingTop: '6rem' }}>
        <div className="container">
          <h2 className="section-title">איך זה נעשה</h2>
          <p className="section-description">
            תהליך הבנייה והמימוש של פרויקט המטרו הגדול בישראל
          </p>
          <div className="timeline">
            {timelineItems.map((item, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}>
                <div className="timeline-marker">
                  <div className="timeline-step">{item.step}</div>
                  <div className="timeline-line"></div>
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="info-content" style={{ marginTop: '4rem' }}>
            <p>
              <strong>תהליך המימוש:</strong> הפרויקט מנוהל על ידי נת"ע (נתיבי תחבורה עירוניים) 
              ומשרד התחבורה, תוך שיתוף פעולה מלא עם הרשויות המקומיות, משרדי הממשלה 
              וחברות התשתית. האתגר גדול והאחריות אדירה, אך המטרו הוא מחויב המציאות 
              למען הדורות הבאים.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 מטרו ישראל - פרויקט התחבורה הגדול בישראל</p>
        </div>
      </footer>
    </div>
  )
}

export default HowItsDone

