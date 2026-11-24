import { useState, type FormEvent } from 'react'
import { ArrowLeft, GraduationCap, LockKeyhole, Mail } from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace/>
  const submit = (event: FormEvent) => { event.preventDefault(); if (login(username,password)) navigate(username.trim().toLowerCase()==='admin' ? '/admin' : '/', {replace:true}); else setError('Usuário/e-mail ou senha incorretos.') }
  return <div className="auth-page"><Link className="auth-back" to="/inicio"><ArrowLeft size={16}/> Voltar ao início</Link><div className="auth-card"><Link className="public-brand auth-brand" to="/inicio"><span className="public-brand-icon"><GraduationCap/></span>Study<span>Flow</span></Link><div className="auth-heading"><span>BEM-VINDO DE VOLTA</span><h1>Entre na sua conta</h1><p>Acesse seu espaço e continue de onde parou.</p></div><form onSubmit={submit} className="auth-form"><label>Usuário ou e-mail<div className="auth-input"><Mail size={17}/><input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Digite seu usuário ou e-mail" required autoComplete="username"/></div></label><label>Senha<div className="auth-input"><LockKeyhole size={17}/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Digite sua senha" required autoComplete="current-password"/></div></label>{error && <p className="auth-error">{error}</p>}<button className="button-primary auth-submit" type="submit">Entrar na plataforma</button></form><p className="auth-switch">Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p><div className="admin-hint"><strong>Acesso administrativo de demonstração</strong><span>Usuário: admin&nbsp; · &nbsp;Senha: admin</span></div></div><p className="auth-legal">StudyFlow · Sua jornada de aprendizagem em um só lugar.</p></div>
}
