import { createContext, useCallback, useContext, useState } from 'react'
import { revokeCurrentSession } from '../api/directus'

// ─── Контекст ─────────────────────────────────────────────────────────────────
// Зберігаємо токен у localStorage, щоб авторизація не зникала після
// перезавантаження сторінки. Юзера відновлюємо звідти ж.

const TOKEN_KEY = 'smak_auth_token'
const USER_KEY = 'smak_auth_user'

function readStorage() {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    const raw = localStorage.getItem(USER_KEY)
    const user = raw ? JSON.parse(raw) : null
    return { token, user }
  } catch {
    return { token: null, user: null }
  }
}

const AuthContext = createContext(null)

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const initial = readStorage()
  const [token, setToken] = useState(initial.token)
  const [user, setUser] = useState(initial.user)

  // Викликається після успішної верифікації коду (verifyLoginCode)
  // payload: { token, user }
  const login = useCallback(({ token, user }) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    setToken(token)
    setUser(user)
  }, [])

  // Вихід — чистимо storage і стейт
  const logout = useCallback(() => {
    if (token) {
      void revokeCurrentSession(token)
    }

    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }, [token])

  // Оновлення профілю (EditPersonalDataModal)
  const updateUser = useCallback((updatedFields) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedFields }
      localStorage.setItem(USER_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isAuthorized = Boolean(token)

  return (
    <AuthContext.Provider value={{ token, user, isAuthorized, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
// Використання: const { user, isAuthorized, login, logout } = useAuth()
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
