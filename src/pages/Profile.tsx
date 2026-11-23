import { useState } from 'react'
import { Camera, Mail, Save, UserRound } from 'lucide-react'
import PageTitle from '../components/PageTitle'

export default function Profile() {
  const [name,setName] = useState(()=>localStorage.getItem('studyflow-name') || 'Luis Gustavo')
  const [email,setEmail] = useState(()=>localStorage.getItem('studyflow-email') || '')
  const [saved,setSaved] = useState(false)
  function submit(e: React.FormEvent) { e.preventDefault(); localStorage.setItem('studyflow-name',name); localStorage.setItem('studyflow-email',email); setSaved(true); setTimeout(()=>setSaved(false),2500) }
  return <div className="page-stack"><PageTitle eyebrow="SEU ESPAÇO PESSOAL" title="Meu perfil" description="Mantenha suas informações atualizadas."/>
    <div className="profile-layout"><div className="panel profile-card"><div className="profile-avatar">LG<button aria-label="Alterar foto"><Camera size={15}/></button></div><h2>{name || 'Estudante'}</h2><p>Estudante · StudyFlow</p><span className="profile-status"><span/> Perfil ativo</span></div>
      <form className="panel profile-form" onSubmit={submit}><div className="panel-heading"><div><h2>Informações pessoais</h2><p>Esses dados ficam salvos neste dispositivo.</p></div><UserRound color="var(--primary)"/></div><label className="field">Nome completo<input value={name} onChange={e=>setName(e.target.value)} required/></label><label className="field">E-mail (opcional)<div className="input-icon"><Mail size={17}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seuemail@exemplo.com"/></div></label><div className="form-actions"><span className="save-feedback">{saved ? 'Alterações salvas!' : ''}</span><button className="button-primary"><Save size={16}/> Salvar alterações</button></div></form>
    </div>
  </div>
}
