import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type StudyUser = { id: string; name: string; email: string; password: string; role: 'admin' | 'student' }
type AuthContextValue = {
  user: StudyUser | null
  users: StudyUser[]
  login: (username: string, password: string) => boolean
  register: (name: string, email: string, password: string) => { ok: boolean; message?: string }
  logout: () => void
  deleteUser: (id: string) => void
}
const ADMIN: StudyUser = { id: 'studyflow-admin', name: 'Administrador', email: 'admin', password: 'admin', role: 'admin' }
const AuthContext = createContext<AuthContextValue | null>(null)
function readUsers(): StudyUser[] {
  try { return JSON.parse(localStorage.getItem('studyflow-users') || '[]') as StudyUser[] } catch { return [] }
}
function readUser(): StudyUser | null {
  try { return JSON.parse(localStorage.getItem('studyflow-session') || 'null') as StudyUser | null } catch { return null }
}
export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<StudyUser[]>(readUsers)
  const [user, setUser] = useState<StudyUser | null>(readUser)
  const persistUsers = (next: StudyUser[]) => { setUsers(next); localStorage.setItem('studyflow-users', JSON.stringify(next)) }
  const login = (username: string, password: string) => {
    const found = username.trim().toLowerCase() === 'admin' && password === 'admin'
      ? ADMIN
      : users.find(item => item.email.toLowerCase() === username.trim().toLowerCase() && item.password === password)
    if (!found) return false
    setUser(found); localStorage.setItem('studyflow-session', JSON.stringify(found)); return true
  }
  const register = (name: string, email: string, password: string) => {
    if (users.some(item => item.email.toLowerCase() === email.trim().toLowerCase()) || email.trim().toLowerCase() === 'admin')
      return { ok: false, message: 'Este e-mail já está cadastrado.' }
    const next = [...users, { id: crypto.randomUUID(), name: name.trim(), email: email.trim(), password, role: 'student' as const }]
    persistUsers(next); return { ok: true }
  }
  const logout = () => { setUser(null); localStorage.removeItem('studyflow-session') }
  const deleteUser = (id: string) => persistUsers(users.filter(item => item.id !== id))
  const value = useMemo(() => ({ user, users, login, register, logout, deleteUser }), [user, users])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}
