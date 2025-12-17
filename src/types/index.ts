export type SubjectStatus = 'pending' | 'approved' | 'failed' | 'in-progress'

export type SubjectCategory = 
  | 'fisiopatologia'
  | 'psicologia-ciclo-vital'
  | 'antropologia-prevencion'
  | 'adulto-mayor'
  | 'educacion-ingles'
  | 'bases-integradores'

export interface Subject {
  id: string
  name: string
  code: string
  semester: number
  credits: number
  prerequisites: string[]
  category: SubjectCategory
}

export interface Grade {
  id: string
  name: string
  grade: number
  percentage: number
}

export interface SubjectWithStatus extends Subject {
  status: SubjectStatus
  finalGrade: number | null
  grades: Grade[]
}

export const CATEGORY_COLORS = {
  'fisiopatologia': {
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    text: 'text-purple-800',
    badge: 'bg-purple-200 text-purple-800',
    name: 'Fisiopatología'
  },
  'psicologia-ciclo-vital': {
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    text: 'text-blue-800',
    badge: 'bg-blue-200 text-blue-800',
    name: 'Psicología y Ciclo Vital'
  },
  'antropologia-prevencion': {
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    text: 'text-emerald-800',
    badge: 'bg-emerald-200 text-emerald-800',
    name: 'Antropología y Prevención'
  },
  'adulto-mayor': {
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    text: 'text-amber-800',
    badge: 'bg-amber-200 text-amber-800',
    name: 'Cuidado Adulto Mayor'
  },
  'educacion-ingles': {
    bg: 'bg-cyan-50',
    border: 'border-cyan-300',
    text: 'text-cyan-800',
    badge: 'bg-cyan-200 text-cyan-800',
    name: 'Educación e Inglés'
  },
  'bases-integradores': {
    bg: 'bg-rose-50',
    border: 'border-rose-300',
    text: 'text-rose-800',
    badge: 'bg-rose-200 text-rose-800',
    name: 'Bases e Integradores'
  }
} as const
