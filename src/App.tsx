import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Subjects from './pages/Subjects'
import Tasks from './pages/Tasks'
import CalendarPage from './pages/Calendar'
import Statistics from './pages/Statistics'
import Profile from './pages/Profile'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import { useAuth } from './context/AuthContext'

function PrivateLayout() {
  const { user } = useAuth()
  return user ? <Layout /> : <Navigate to="/inicio" replace />
}
export default function App() {
  const { user } = useAuth()
  return <Routes>
    <Route path="/inicio" element={<Landing/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/cadastro" element={<Register/>}/>
    <Route path="/admin" element={<Admin/>}/>
    <Route element={<PrivateLayout/>}>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/disciplinas" element={<Subjects/>}/>
      <Route path="/tarefas" element={<Tasks/>}/>
      <Route path="/calendario" element={<CalendarPage/>}/>
      <Route path="/estatisticas" element={<Statistics/>}/>
      <Route path="/perfil" element={<Profile/>}/>
    </Route>
    <Route path="*" element={<Navigate to={user ? (user.role === 'admin' ? '/admin' : '/') : '/inicio'} replace/>}/>
  </Routes>
}
