import { NavLink, Outlet } from 'react-router-dom'
import { BookOpen, CalendarDays, ChartNoAxesCombined, LayoutDashboard, ListTodo, UserRound, GraduationCap, Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { to: '/', label: 'Visão geral', icon: LayoutDashboard, end: true },
  { to: '/disciplinas', label: 'Disciplinas', icon: BookOpen },
  { to: '/tarefas', label: 'Tarefas', icon: ListTodo },
  { to: '/calendario', label: 'Calendário', icon: CalendarDays },
  { to: '/estatisticas', label: 'Estatísticas', icon: ChartNoAxesCombined },
  { to: '/perfil', label: 'Meu perfil', icon: UserRound },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="brand"><span className="brand-icon"><GraduationCap size={23} /></span><span>Study<span>Flow</span></span></div>
        <div className="side-label">MENU PRINCIPAL</div>
        <nav className="nav-list">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setOpen(false)}>
              <Icon size={19} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="tip-card"><div className="tip-spark">✦</div><strong>Pequenos passos, grandes resultados.</strong><p>Um pouco de estudo todos os dias faz diferença.</p></div>
          <div className="sidebar-user"><div className="avatar">LG</div><div><strong>Luis Gustavo</strong><small>Estudante</small></div></div>
        </div>
      </aside>
      {open && <button className="mobile-scrim" aria-label="Fechar menu" onClick={() => setOpen(false)} />}
      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Abrir menu">{open ? <X /> : <Menu />}</button>
          <div className="breadcrumb">Workspace <span>/</span> <strong>Meu espaço</strong></div>
          <div className="topbar-right"><span className="today-label">{new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}</span><div className="avatar avatar-small">LG</div></div>
        </header>
        <div className="page-content"><Outlet /></div>
        <footer className="footer">StudyFlow <span>•</span> Organize sua rotina, conquiste seus objetivos.</footer>
      </main>
    </div>
  )
}
