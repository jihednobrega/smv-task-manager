import { createContext, useContext, useState, useEffect } from 'react'
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
} from '../services/firebase'
import { User } from 'firebase/auth'

type AuthUser = User | { name?: string; email: string } | null

type AuthContextType = {
  user: AuthUser
  signInWithGoogle: () => void
  loginWithEmail: (email: string, password: string) => boolean
  signupWithEmail: (email: string, password: string, name: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | { email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const EXPIRATION_TIME = 24 * 60 * 60 * 1000 // 24 horas

  useEffect(() => {
    setLoading(true)

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const userData = {
          name: currentUser.displayName || undefined,
          email: currentUser.email || '',
        }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('loginTime', new Date().getTime().toString())
      }
    })

    const storedUser = localStorage.getItem('user')
    const storedTime = localStorage.getItem('loginTime')

    if (storedUser && storedTime) {
      const loginTime = parseInt(storedTime, 10)
      const currentTime = new Date().getTime()

      if (currentTime - loginTime < EXPIRATION_TIME) {
        setUser(JSON.parse(storedUser))
      } else {
        logout()
      }
    }

    setLoading(false)
    return () => unsubscribe()
  }, [])

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider)

      const userData = {
        name: result.user.displayName || undefined,
        email: result.user.email || '',
      }

      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } catch (error) {
      console.error('Erro ao autenticar:', error)
    }
  }

  function signupWithEmail(
    name: string,
    email: string,
    password: string,
  ): boolean {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')

    if (existingUsers.some((user: { email: string }) => user.email === email)) {
      return false
    }

    const newUser = { name, email, password }
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]))
    return true
  }

  function loginWithEmail(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = users.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password,
    )

    if (foundUser) {
      const userData: AuthUser = {
        name: foundUser.name,
        email: foundUser.email,
      }
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('loginTime', new Date().getTime().toString())
      setUser(userData)
      return true
    }

    return false
  }

  async function logout() {
    await signOut(auth)
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('loginTime')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        loginWithEmail,
        signupWithEmail,
        logout,
      }}
    >
      {!loading && children}{' '}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
