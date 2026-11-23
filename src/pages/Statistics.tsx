import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Award, CheckCircle2, ListTodo, Target } from 'lucide-react'
import PageTitle from '../components/PageTitle'
import StatCard from '../components/StatCard'
import { useStudy } from '../context/StudyContext'

export default function Statistics() {
  const { tasks, subjects } = useStudy()
  const completed = tasks.filter(t=>t.completed).length
  const progress = tasks.length ? Math.round(completed/tasks.length*100) : 0
  const chartData = useMemo(()=>subjects.map(s=>({name:s.name.length>13?s.name.slice(0,13)+'…':s.name, total:tasks.filter(t=>t.subjectId===s.id).length, done:tasks.filter(t=>t.subjectId===s.id && t.completed).length})),[subjects,tasks])
  return <div className="page-stack"><PageTitle eyebrow="ACOMPANHE SUA EVOLUÇÃO" title="Estatísticas" description="Veja como seus hábitos de estudo estão evoluindo."/>
    <section className="stats-grid"><StatCard label="Tarefas totais" value={tasks.length} helper="Atividades cadastradas" icon={ListTodo} tone="purple"/><StatCard label="Concluídas" value={completed} helper="Atividades finalizadas" icon={CheckCircle2} tone="green"/><StatCard label="Progresso geral" value={`${progress}%`} helper="Conclusão das tarefas" icon={Target} tone="blue"/><StatCard label="Disciplinas" value={subjects.length} helper="Matérias acompanhadas" icon={Award} tone="orange"/></section>
    <div className="panel chart-panel"><div className="panel-heading"><div><h2>Atividades por disciplina</h2><p>Compare tarefas cadastradas e concluídas.</p></div></div><div className="chart-wrap">{chartData.length ? <ResponsiveContainer width="100%" height="100%"><BarChart data={chartData} margin={{top:12,right:12,left:-18,bottom:4}}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f5"/><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#7d8495',fontSize:12}}/><YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fill:'#7d8495',fontSize:12}}/><Tooltip/><Bar dataKey="total" name="Cadastradas" fill="#c9c5ff" radius={[5,5,0,0]}/><Bar dataKey="done" name="Concluídas" fill="#6c63ff" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer> : <div className="empty-state">Cadastre disciplinas para visualizar os dados.</div>}</div></div>
  </div>
}
