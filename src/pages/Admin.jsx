import React, { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, Timestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase'

const ADMIN_PASSWORD = 'metro2024' // Change this to your preferred password

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: { he: '', en: '' },
    excerpt: { he: '', en: '' },
    content: { he: '', en: '' },
    image: ''
  })

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts()
    }
  }, [isAuthenticated])

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

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
    } else {
      alert('Incorrect password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setFormData({ ...formData, image: url })
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image. Make sure Firebase Storage is enabled.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingPost) {
        await updateDoc(doc(db, 'posts', editingPost.id), {
          ...formData,
          updatedAt: Timestamp.now()
        })
      } else {
        await addDoc(collection(db, 'posts'), {
          ...formData,
          createdAt: Timestamp.now()
        })
      }
      resetForm()
      fetchPosts()
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Error saving post')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData({
      title: post.title || { he: '', en: '' },
      excerpt: post.excerpt || { he: '', en: '' },
      content: post.content || { he: '', en: '' },
      image: post.image || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return

    try {
      await deleteDoc(doc(db, 'posts', postId))
      fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Error deleting post')
    }
  }

  const resetForm = () => {
    setFormData({
      title: { he: '', en: '' },
      excerpt: { he: '', en: '' },
      content: { he: '', en: '' },
      image: ''
    })
    setEditingPost(null)
    setShowForm(false)
  }

  // Check for saved auth on mount
  useEffect(() => {
    if (localStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>News Admin</h1>
        <div className="admin-actions">
          <button onClick={() => { resetForm(); setShowForm(true) }} className="btn-primary">
            + New Post
          </button>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>
      </div>

      {showForm && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h2>{editingPost ? 'Edit Post' : 'New Post'}</h2>
              <button onClick={resetForm} className="close-btn">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-field">
                  <label>Title (Hebrew)</label>
                  <input
                    type="text"
                    value={formData.title.he}
                    onChange={(e) => setFormData({
                      ...formData,
                      title: { ...formData.title, he: e.target.value }
                    })}
                    required
                    dir="rtl"
                  />
                </div>
                <div className="form-field">
                  <label>Title (English)</label>
                  <input
                    type="text"
                    value={formData.title.en}
                    onChange={(e) => setFormData({
                      ...formData,
                      title: { ...formData.title, en: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Short Description (Hebrew)</label>
                  <textarea
                    value={formData.excerpt.he}
                    onChange={(e) => setFormData({
                      ...formData,
                      excerpt: { ...formData.excerpt, he: e.target.value }
                    })}
                    required
                    rows="2"
                    dir="rtl"
                  />
                </div>
                <div className="form-field">
                  <label>Short Description (English)</label>
                  <textarea
                    value={formData.excerpt.en}
                    onChange={(e) => setFormData({
                      ...formData,
                      excerpt: { ...formData.excerpt, en: e.target.value }
                    })}
                    rows="2"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Full Content (Hebrew)</label>
                  <textarea
                    value={formData.content.he}
                    onChange={(e) => setFormData({
                      ...formData,
                      content: { ...formData.content, he: e.target.value }
                    })}
                    required
                    rows="6"
                    dir="rtl"
                  />
                </div>
                <div className="form-field">
                  <label>Full Content (English)</label>
                  <textarea
                    value={formData.content.en}
                    onChange={(e) => setFormData({
                      ...formData,
                      content: { ...formData.content, en: e.target.value }
                    })}
                    rows="6"
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Image</label>
                <div className="image-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="image-input"
                  />
                  {uploading && <span className="uploading">Uploading...</span>}
                  {formData.image && (
                    <div className="image-preview">
                      <img src={formData.image} alt="Preview" />
                      <button type="button" onClick={() => setFormData({ ...formData, image: '' })}>
                        Remove
                      </button>
                    </div>
                  )}
                </div>
                <p className="hint">Or paste image URL:</p>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingPost ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-posts">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="no-posts">No posts yet. Create your first post!</div>
        ) : (
          <table className="posts-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>
                    {post.image ? (
                      <img src={post.image} alt="" className="table-thumb" />
                    ) : (
                      <div className="no-image">No image</div>
                    )}
                  </td>
                  <td>
                    <strong>{post.title?.he || 'Untitled'}</strong>
                    <br />
                    <small>{post.title?.en}</small>
                  </td>
                  <td>
                    {post.createdAt?.toDate?.().toLocaleDateString('he-IL')}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(post)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="btn-delete">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Admin
