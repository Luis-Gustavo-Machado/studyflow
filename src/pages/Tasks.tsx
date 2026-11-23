import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import PageTitle from '../components/PageTitle'
import TaskItem from '../components/TaskItem'
import { useStudy } from '../context/StudyContext'
import type { Task } from '../types'

export default function Tasks() {
  const { tasks, subjects, addTask, toggleTask, deleteTask } = useStudy()
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '')
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0,10))
  const [priority, setPriority] = useState<Task['priority']>('Média')
  const filtered = tasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()))
  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !subjectId) return
    addTask({ id: crypto.randomUUID(), title: title.trim(), subjectId, dueDate, priority, completed: false })
    setTitle(''); setShowForm(false)
  }
  return <div className="page-stack">
    <PageTitle eyebrow="ORGANIZE SUA ROTINA" title="Minhas tarefas" description="Transforme seus objetivos em pequenas conquistas." action={<button className="button-primary" onClick={()=>setShowForm(!showForm)}><Plus size={17}/> Nova tarefa</button>}/>
    {showForm && <form className="panel form-panel" onSubmit={submit}><h2>Adicionar tarefa</h2><div className="form-grid"><label className="field wide">Nome da tarefa<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Ex.: Estudar hooks do React" required/></label><label className="field">Disciplina<select value={subjectId} onChange={e=>setSubjectId(e.target.value)} required>{subjects.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label><label className="field">Data de entrega<input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} required/></label><label className="field">Prioridade<select value={priority} onChange={e=>setPriority(e.target.value as Task['priority'])}><option>Baixa</option><option>Média</option><option>Alta</option></select></label></div><div className="form-actions"><button type="button" className="button-ghost" onClick={()=>setShowForm(false)}>Cancelar</button><button className="button-primary">Salvar tarefa</button></div></form>}
    <div className="panel"><div className="panel-heading"><div><h2>Lista de atividades</h2><p>{tasks.filter(t=>!t.completed).length} pendentes · {tasks.filter(t=>t.completed).length} concluídas</p></div><div className="search-box"><Search size={16}/><input placeholder="Buscar tarefa..." value={query} onChange={e=>setQuery(e.target.value)}/></div></div>
      {filtered.length ? filtered.map(task=><TaskItem key={task.id} task={task} subject={subjects.find(s=>s.id===task.subjectId)} onToggle={()=>toggleTask(task.id)} onDelete={()=>deleteTask(task.id)}/>) : <div className="empty-state">Nenhuma tarefa encontrada.</div>}
    </div>
  </div>
}
