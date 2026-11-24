import { Check, Circle, Trash2 } from 'lucide-react'
import type { Task, Subject } from '../types'

export default function TaskItem({ task, subject, onToggle, onDelete }: { task: Task; subject?: Subject; onToggle: () => void; onDelete?: () => void }) {
  return (
    <div className={`task-item ${task.completed ? 'task-done' : ''}`}>
      <button className="task-check" onClick={onToggle} aria-label={task.completed ? 'Marcar como pendente' : 'Concluir tarefa'}>{task.completed ? <Check size={15} /> : <Circle size={17} />}</button>
      <div className="task-main"><strong>{task.title}</strong><small><span className="subject-dot" style={{ background: subject?.color || '#aaa' }} />{subject?.name || 'Sem disciplina'} · {new Date(`${task.dueDate}T12:00:00`).toLocaleDateString('pt-BR')}</small></div>
      <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
      {onDelete && <button className="icon-button delete-button" onClick={onDelete} aria-label="Excluir tarefa"><Trash2 size={16} /></button>}
    </div>
  )
}
