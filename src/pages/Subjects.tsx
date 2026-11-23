import { useState } from 'react'
import { BookOpen, Plus } from 'lucide-react'
import PageTitle from '../components/PageTitle'
import { useStudy } from '../context/StudyContext'

const colors = ['#6c63ff','#18a999','#f4a340','#e66b91','#4b91d1','#8a65b5']
export default function Subjects() {
  const { subjects, tasks, addSubject } = useStudy()
  const [name,setName] = useState('')
  const [teacher,setTeacher] = useState('')
  const [show,setShow] = useState(false)
  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    addSubject({ id: crypto.randomUUID(), name: name.trim(), teacher: teacher.trim() || 'Não informado', color: colors[subjects.length % colors.length] })
    setName(''); setTeacher(''); setShow(false)
  }
  return <div className="page-stack"><PageTitle eyebrow="SEU CONTEÚDO EM UM SÓ LUGAR" title="Disciplinas" description="Organize as matérias que fazem parte da sua jornada." action={<button className="button-primary" onClick={()=>setShow(!show)}><Plus size={17}/> Nova disciplina</button>}/>
    {show && <form className="panel form-panel" onSubmit={submit}><h2>Cadastrar disciplina</h2><div className="form-grid"><label className="field">Nome<input value={name} onChange={e=>setName(e.target.value)} placeholder="Ex.: Programação Web" required/></label><label className="field">Professor<input value={teacher} onChange={e=>setTeacher(e.target.value)} placeholder="Nome do professor"/></label></div><div className="form-actions"><button type="button" className="button-ghost" onClick={()=>setShow(false)}>Cancelar</button><button className="button-primary">Salvar</button></div></form>}
    <div className="subject-grid">{subjects.map(subject=><article className="subject-card" key={subject.id}><div className="subject-card-top"><span className="subject-color large" style={{background:subject.color}}><BookOpen size={21}/></span><span className="subject-pill">Ativa</span></div><h2>{subject.name}</h2><p>{subject.teacher}</p><div className="subject-card-bottom"><span>{tasks.filter(t=>t.subjectId===subject.id).length} tarefas</span><span className="subject-line" style={{background:subject.color}}/></div></article>)}</div>
  </div>
}
