import { ArrowUpRight, BookOpen, CheckCircle2, Clock3, Flame, Plus, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useStudy } from '../context/StudyContext'
import { useGreeting } from '../hooks/useGreeting'
import PageTitle from '../components/PageTitle'
import StatCard from '../components/StatCard'
import TaskItem from '../components/TaskItem'

export default function Dashboard() {
  const { tasks, subjects, toggleTask } = useStudy()
  const greeting = useGreeting()
  const completed = tasks.filter(task => task.completed).length
  const pending = tasks.filter(task => !task.completed)
  const progress = tasks.length ? Math.round(completed / tasks.length * 100) : 0
  const nextTasks = useMemo(() => [...pending].sort((a,b) => a.dueDate.localeCompare(b.dueDate)).slice(0,4), [pending])
  return <div className="page-stack">
    <PageTitle eyebrow="SEGUNDA-FEIRA, FOCO NOS OBJETIVOS" title={`${greeting}, Luis Gustavo!`} description="Aqui está um resumo da sua jornada de aprendizagem." action={<Link to="/tarefas" className="button-primary"><Plus size={17}/> Nova tarefa</Link>} />
    <section className="welcome-banner"><div><span className="banner-tag"><Flame size={14}/> SEU PROGRESSO</span><h2>Continue no seu ritmo.<br/><em>Você está construindo algo grande.</em></h2><p>Consistência é melhor que intensidade. Dê o próximo passo hoje.</p></div><div className="banner-progress"><div className="progress-ring"><strong>{progress}%</strong><small>concluído</small></div><span>Progresso das tarefas</span></div><div className="banner-decoration">✦</div></section>
    <div className="section-heading"><div><h2>Seu panorama</h2><p>Acompanhe seus números de hoje.</p></div></div>
    <section className="stats-grid">
      <StatCard label="Disciplinas" value={subjects.length} helper="Matérias cadastradas" icon={BookOpen} tone="purple"/>
      <StatCard label="Tarefas pendentes" value={pending.length} helper="Aguardando conclusão" icon={Clock3} tone="orange"/>
      <StatCard label="Tarefas concluídas" value={completed} helper="Você está avançando!" icon={CheckCircle2} tone="green"/>
      <StatCard label="Meta de estudos" value="2h" helper="Meta diária sugerida" icon={Target} tone="blue"/>
    </section>
    <section className="dashboard-grid">
      <div className="panel"><div className="panel-heading"><div><h2>Próximas tarefas</h2><p>O que merece sua atenção</p></div><Link to="/tarefas" className="text-link">Ver todas <ArrowUpRight size={15}/></Link></div>
        {nextTasks.length ? nextTasks.map(task => <TaskItem key={task.id} task={task} subject={subjects.find(s => s.id === task.subjectId)} onToggle={() => toggleTask(task.id)}/>) : <div className="empty-state">Tudo em dia! Adicione uma nova tarefa.</div>}
      </div>
      <div className="panel subjects-panel"><div className="panel-heading"><div><h2>Minhas disciplinas</h2><p>Seu espaço de aprendizagem</p></div><Link to="/disciplinas" className="text-link">Ver todas</Link></div>
        {subjects.slice(0,4).map(subject => <div className="subject-mini" key={subject.id}><span className="subject-color" style={{background:subject.color}}><BookOpen size={17}/></span><div><strong>{subject.name}</strong><small>{tasks.filter(t=>t.subjectId===subject.id).length} tarefas</small></div><ArrowUpRight size={16}/></div>)}
        <Link to="/disciplinas" className="add-subject"><Plus size={16}/> Adicionar disciplina</Link>
      </div>
    </section>
  </div>
}
