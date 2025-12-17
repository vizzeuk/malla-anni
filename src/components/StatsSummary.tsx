import { SubjectWithStatus } from '../types'
import { BookOpen, CheckCircle, Clock, XCircle, TrendingUp, Award } from 'lucide-react'

interface StatsSummaryProps {
  subjects: SubjectWithStatus[]
}

export default function StatsSummary({ subjects }: StatsSummaryProps) {
  const approved = subjects.filter(s => s.status === 'approved').length
  const inProgress = subjects.filter(s => s.status === 'in-progress').length
  const failed = subjects.filter(s => s.status === 'failed').length
  const pending = subjects.filter(s => s.status === 'pending').length

  // Calcular promedio general (solo de ramos aprobados con notas)
  const approvedWithGrades = subjects.filter(
    s => s.status === 'approved' && s.grades.length > 0
  )
  
  const totalGrades = approvedWithGrades.reduce((sum, subject) => {
    const totalPercentage = subject.grades.reduce((acc, g) => acc + g.percentage, 0)
    if (totalPercentage === 100) {
      const finalGrade = subject.grades.reduce((acc, g) => acc + (g.grade * g.percentage / 100), 0)
      return sum + finalGrade
    }
    return sum
  }, 0)

  const generalAverage = approvedWithGrades.length > 0 
    ? (totalGrades / approvedWithGrades.length).toFixed(2)
    : '0.00'

  const stats = [
    {
      label: 'Aprobados',
      value: approved,
      icon: <CheckCircle size={20} />,
      color: 'text-primary-600',
      bg: 'bg-primary-50',
      border: 'border-primary-200'
    },
    {
      label: 'En Curso',
      value: inProgress,
      icon: <Clock size={20} />,
      color: 'text-primary-500',
      bg: 'bg-primary-50',
      border: 'border-primary-200'
    },
    {
      label: 'Reprobados',
      value: failed,
      icon: <XCircle size={20} />,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      border: 'border-gray-200'
    },
    {
      label: 'Pendientes',
      value: pending,
      icon: <BookOpen size={20} />,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      border: 'border-gray-200'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Award className="text-primary-500" size={20} />
        <h3 className="text-lg font-semibold text-gray-900">
          Resumen Académico
        </h3>
      </div>

      {/* Estadísticas en grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} ${stat.border} border rounded-lg p-3`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={stat.color}>{stat.icon}</span>
              <span className="text-xs font-medium text-gray-600">{stat.label}</span>
            </div>
            <div className={`text-2xl font-semibold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Promedio General */}
      {approvedWithGrades.length > 0 && (
        <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-primary-500" size={20} />
              <span className="font-medium text-gray-700">Promedio General</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-semibold ${
                parseFloat(generalAverage) >= 4.0 ? 'text-primary-600' : 'text-gray-600'
              }`}>
                {generalAverage}
              </span>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-600 text-center">
            Basado en {approvedWithGrades.length} ramo{approvedWithGrades.length !== 1 ? 's' : ''} con notas registradas
          </div>
        </div>
      )}
    </div>
  )
}
