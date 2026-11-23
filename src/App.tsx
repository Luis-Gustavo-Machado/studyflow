import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Subjects from './pages/Subjects'
import Tasks from './pages/Tasks'
import CalendarPage from './pages/Calendar'
import Statistics from './pages/Statistics'
import Profile from './pages/Profile'

export default function App() {
  return <Routes><Route element={<Layout/>}><Route index element={<Dashboard/>}/><Route path="disciplinas" element={<Subjects/>}/><Route path="tarefas" element={<Tasks/>}/><Route path="calendario" element={<CalendarPage/>}/><Route path="estatisticas" element={<Statistics/>}/><Route path="perfil" element={<Profile/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes>
}
