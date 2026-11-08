// Server-side reads of the public `posts` collection over Firestore's REST API.
// The rules allow anyone to read posts, so no key or SDK is needed.

const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`

const fromValue = (v) => {
  if ('stringValue' in v) return v.stringValue
  if ('timestampValue' in v) return v.timestampValue
  if ('integerValue' in v) return Number(v.integerValue)
  if ('doubleValue' in v) return v.doubleValue
  if ('booleanValue' in v) return v.booleanValue
  if ('mapValue' in v) return fromFields(v.mapValue.fields || {})
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(fromValue)
  return null
}

const fromFields = (fields) =>
  Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, fromValue(value)]))

const fromDocument = (d) => ({ id: d.name.split('/').pop(), ...fromFields(d.fields || {}) })

// Newest first, as plain JSON (dates stay ISO strings)
export async function listPosts(max = Infinity) {
  const posts = []
  let pageToken = ''
  do {
    const params = new URLSearchParams({ orderBy: 'createdAt desc', pageSize: String(Math.min(max, 300)) })
    if (pageToken) params.set('pageToken', pageToken)
    const res = await fetch(`${BASE}/posts?${params}`)
    if (!res.ok) throw new Error(`Firestore list failed: ${res.status}`)
    const body = await res.json()
    posts.push(...(body.documents || []).map(fromDocument))
    pageToken = body.nextPageToken
  } while (pageToken && posts.length < max)
  return posts.slice(0, max)
}

export async function getPost(id) {
  if (!/^[A-Za-z0-9_-]{1,200}$/.test(id)) return null
  const res = await fetch(`${BASE}/posts/${id}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Firestore get failed: ${res.status}`)
  return fromDocument(await res.json())
}
