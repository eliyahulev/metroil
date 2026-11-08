// Posts reach the app two ways: as JSON inside the server's HTML (dates as ISO strings)
// and from Firestore in the browser (dates as Timestamps). Both become this shape,
// with plain Date objects, before any component sees them.

const toDate = (value) => {
  if (!value) return null
  if (typeof value.toDate === 'function') return value.toDate()
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export const normalizePost = (raw) => ({
  ...raw,
  createdAt: toDate(raw.createdAt),
  updatedAt: toDate(raw.updatedAt),
})

export const localized = (field, language) => (field && (field[language] || field.he)) || ''

// A fixed time zone, so the server and the browser print the same date
export const formatDate = (date, language) =>
  date.toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', { timeZone: 'Asia/Jerusalem' })

// Firebase is loaded only when the browser has to fetch posts itself, so a page
// that arrives with its posts in the HTML never downloads it.
const firestore = () => Promise.all([import('firebase/firestore'), import('../firebase')])

export async function fetchPosts(max) {
  const [{ collection, getDocs, query, orderBy, limit }, { db }] = await firestore()
  const constraints = [orderBy('createdAt', 'desc')]
  if (max) constraints.push(limit(max))
  const snapshot = await getDocs(query(collection(db, 'posts'), ...constraints))
  return snapshot.docs.map(d => normalizePost({ id: d.id, ...d.data() }))
}

export async function fetchPost(id) {
  const [{ doc, getDoc }, { db }] = await firestore()
  const snapshot = await getDoc(doc(db, 'posts', id))
  return snapshot.exists() ? normalizePost({ id: snapshot.id, ...snapshot.data() }) : null
}
