import type { Subject, Task, StudyEvent } from '../types'

export const initialSubjects: Subject[] = [
  { id: 's1', name: 'Programação Web', color: '#6c63ff', teacher: 'Prof. responsável' },
  { id: 's2', name: 'Banco de Dados', color: '#18a999', teacher: 'Prof. responsável' },
  { id: 's3', name: 'Engenharia de Software', color: '#f4a340', teacher: 'Prof. responsável' },
]

const today = new Date()
const dateOffset = (days: number) => {
  const date = new Date(today)
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

export const initialTasks: Task[] = [
  { id: 't1', title: 'Revisar componentes React', subjectId: 's1', dueDate: dateOffset(1), priority: 'Alta', completed: false },
  { id: 't2', title: 'Praticar consultas SQL', subjectId: 's2', dueDate: dateOffset(2), priority: 'Média', completed: false },
  { id: 't3', title: 'Ler capítulo sobre requisitos', subjectId: 's3', dueDate: dateOffset(3), priority: 'Baixa', completed: true },
  { id: 't4', title: 'Finalizar atividade TypeScript', subjectId: 's1', dueDate: dateOffset(4), priority: 'Alta', completed: false },
]

export const initialEvents: StudyEvent[] = [
  { id: 'e1', title: 'Revisão de React', date: dateOffset(1), time: '14:00' },
  { id: 'e2', title: 'Exercícios de SQL', date: dateOffset(2), time: '16:00' },
]
