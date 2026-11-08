import React, { createContext, useContext } from 'react'
import { useLocation } from 'react-router-dom'

// The data the server rendered a page with ({ path, posts } or { path, post }).
// The browser reads the same data from the HTML, so its first render matches the
// server's and the page doesn't fetch it a second time.
const InitialDataContext = createContext(null)

export const InitialDataProvider = ({ value, children }) => (
  <InitialDataContext.Provider value={value}>{children}</InitialDataContext.Provider>
)

// Only for the page it was rendered for; after client navigation, pages fetch their own.
export const useInitialData = () => {
  const data = useContext(InitialDataContext)
  const { pathname } = useLocation()
  return data && data.path === pathname ? data : null
}
