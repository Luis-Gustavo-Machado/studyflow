import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Subject, Task, StudyEvent } from '../types'
import { initialEvents, initialSubjects, initialTasks } from '../data/initialData'

type StudyContextValue = {
  subjects: Subject[]
  tasks: Task[]
  events: StudyEvent[]
  addSubject: (subject: Subject) => void
  updateSubject: (subject: Subject) => void
  deleteSubject: (id: string) => void
  addTask: (task: Task) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  addEvent: (event: StudyEvent) => void
}

const StudyContext = createContext<StudyContextValue | null>(null)

function readStorage<T,>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) as T : fallback
  } catch {
    return fallback
  }
}

export function StudyProvider({ children }: { children: ReactNode }) {
  const [subjects, setSubjects] = useState<Subject[]>(() => readStorage('studyflow-subjects', initialSubjects))
  const [tasks, setTasks] = useState<Task[]>(() => readStorage('studyflow-tasks', initialTasks))
  const [events, setEvents] = useState<StudyEvent[]>(() => readStorage('studyflow-events', initialEvents))

  useEffect(() => { localStorage.setItem('studyflow-subjects', JSON.stringify(subjects)) }, [subjects])
  useEffect(() => { localStorage.setItem('studyflow-tasks', JSON.stringify(tasks)) }, [tasks])
  useEffect(() => { localStorage.setItem('studyflow-events', JSON.stringify(events)) }, [events])

  const value = useMemo(() => ({
    subjects,
    tasks,
    events,
    addSubject: (subject: Subject) => setSubjects(current => [...current, subject]),
    updateSubject: (subject: Subject) => setSubjects(current => current.map(item => item.id === subject.id ? subject : item)),
    deleteSubject: (id: string) => {
      setSubjects(current => current.filter(item => item.id !== id))
      setTasks(current => current.filter(task => task.subjectId !== id))
    },
    addTask: (task: Task) => setTasks(current => [task, ...current]),
    toggleTask: (id: string) => setTasks(current => current.map(task => task.id === id ? { ...task, completed: !task.completed } : task)),
    deleteTask: (id: string) => setTasks(current => current.filter(task => task.id !== id)),
    addEvent: (event: StudyEvent) => setEvents(current => [...current, event]),
  }), [subjects, tasks, events])

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
}

export function useStudy() {
  const context = useContext(StudyContext)
  if (!context) throw new Error('useStudy deve ser usado dentro de StudyProvider')
  return context
}
