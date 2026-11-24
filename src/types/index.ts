export type Subject = {
  id: string
  name: string
  color: string
  teacher: string
}

export type Task = {
  id: string
  title: string
  subjectId: string
  dueDate: string
  priority: 'Baixa' | 'Média' | 'Alta'
  completed: boolean
}

export type StudyEvent = {
  id: string
  title: string
  date: string
  time: string
}
