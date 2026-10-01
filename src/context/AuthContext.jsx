import { createContext, useContext, useState } from 'react'
import { api } from '../services/api.js'

const AuthContext = createContext(null)

// Læser brugerdata (navn, email, rolle, udløb) fra JWT'ens payload
function decodeToken(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
    return JSON.parse(new TextDecoder().decode(bytes))
  } catch {
    return null
  }
}

// Token gemmes i localStorage, så login huskes – udløbne tokens ignoreres
function readSession() {
  try {
    const token = localStorage.getItem('token')
    const user = token && decodeToken(token)
    if (!user || user.exp * 1000 < Date.now()) return null
    return { token, user }
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession)

  const login = async (email, password) => {
    let res
    try {
      res = await api('/auth/signin', { method: 'POST', body: { email, password } })
    } catch (err) {
      // API'et svarer "An Error Occurred" ved forkert email/adgangskode
      throw new Error(err.message.startsWith('Kunne ikke') ? err.message : 'Forkert email eller adgangskode.')
    }

    const user = decodeToken(res.data.token)
    if (user?.role !== 'admin') throw new Error('Din bruger har ikke adgang til backoffice.')

    localStorage.setItem('token', res.data.token)
    setSession({ token: res.data.token, user })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ user: session?.user, token: session?.token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
