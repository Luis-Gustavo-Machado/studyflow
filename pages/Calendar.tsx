import { useState } from 'react'
import { CalendarDays, Plus } from 'lucide-react'
import PageTitle from '../components/PageTitle'
import { useStudy } from '../context/StudyContext'

export default function CalendarPage() {
  const { events, addEvent } = useStudy()
  const [title,setTitle] = useState('')
  const [date,setDate] = useState(new Date().toISOString().slice(0,10))
  const [time,setTime] = useState('14:00')
  const [show,setShow] = useState(false)
  function submit(e: React.FormEvent) { e.preventDefault(); if(!title.trim()) return; addEvent({id:crypto.randomUUID(),title:title.trim(),date,time}); setTitle(''); setShow(false) }
  const sorted = [...events].sort((a,b)=>a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
  return <div className="page-stack"><PageTitle eyebrow="PLANEJE SEU TEMPO" title="Calendário de estudos" description="Visualize e organize seus próximos compromissos." action={<button className="button-primary" onClick={()=>setShow(!show)}><Plus size={17}/> Novo evento</button>}/>
    {show && <form className="panel form-panel" onSubmit={submit}><h2>Adicionar evento</h2><div className="form-grid"><label className="field wide">Título<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Ex.: Revisão para prova" required/></label><label className="field">Data<input type="date" value={date} onChange={e=>setDate(e.target.value)} required/></label><label className="field">Horário<input type="time" value={time} onChange={e=>setTime(e.target.value)} required/></label></div><div className="form-actions"><button type="button" className="button-ghost" onClick={()=>setShow(false)}>Cancelar</button><button className="button-primary">Salvar evento</button></div></form>}
    <div className="panel"><div className="panel-heading"><div><h2>Agenda</h2><p>Seus próximos momentos de foco</p></div><CalendarDays color="var(--primary)"/></div>{sorted.length ? sorted.map(event=><div className="event-row" key={event.id}><div className="event-date"><strong>{new Date(`${event.date}T12:00:00`).getDate()}</strong><small>{new Date(`${event.date}T12:00:00`).toLocaleDateString('pt-BR',{month:'short'})}</small></div><div className="event-info"><strong>{event.title}</strong><small>{new Date(`${event.date}T12:00:00`).toLocaleDateString('pt-BR',{weekday:'long',year:'numeric'})}</small></div><span className="event-time">{event.time}</span></div>) : <div className="empty-state">Nenhum evento cadastrado.</div>}</div>
  </div>
}
