import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On first load, check if a previous login was saved in localStorage
  useEffect(() => {
    const stored = localStorage.getItem('rrs_user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  const login = (authResponse) => {
    // authResponse looks like { token, userId, name, email, role }
    localStorage.setItem('rrs_user', JSON.stringify(authResponse))
    setUser(authResponse)
  }

  const logout = () => {
    localStorage.removeItem('rrs_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}