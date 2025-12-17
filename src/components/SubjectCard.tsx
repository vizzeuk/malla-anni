import { useState } from 'react'
import type { SubjectWithStatus } from '../types'
import { CATEGORY_COLORS } from '../types'
import { NURSING_SUBJECTS } from '../data/subjects'
import { Check, X, Clock, BookOpen, Info } from 'lucide-react'
import GradeModal from './GradeModal'

interface SubjectCardProps {
  subject: SubjectWithStatus
  onUpdateStatus: (subjectId: string, status: SubjectWithStatus['status']) => void
  onUpdateGrades: (subjectId: string, grades: any[]) => void
}

export default function SubjectCard({ subject, onUpdateStatus, onUpdateGrades }: SubjectCardProps) {
  const [showGradeModal, setShowGradeModal] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const categoryColor = CATEGORY_COLORS[subject.category]

  // Obtener nombres de los prerequisitos
  const getPrerequisiteNames = () => {
    if (subject.prerequisites.length === 0) return []
    return subject.prerequisites.map(prereqId => {
      const prereq = NURSING_SUBJECTS.find(s => s.id === prereqId)
      return prereq?.name || prereqId
    })
  }

  const prerequisiteNames = getPrerequisiteNames()

  const getStatusColor = () => {
    switch (subject.status) {
      case 'approved':
        return `${categoryColor.bg} ${categoryColor.border} ${categoryColor.text} opacity-60`
      case 'failed':
        return 'bg-rose-50 border-rose-300 text-rose-800'
      case 'in-progress':
        return `${categoryColor.bg} ${categoryColor.border} ${categoryColor.text}`
      default:
        return `${categoryColor.bg} ${categoryColor.border} ${categoryColor.text} opacity-40`
    }
  }

  const getStatusIcon = () => {
    switch (subject.status) {
      case 'approved':
        return <Check size={18} />
      case 'failed':
        return <X size={18} />
      case 'in-progress':
        return <Clock size={18} />
      default:
        return <BookOpen size={18} />
    }
  }

  const calculateFinalGrade = () => {
    if (subject.grades.length === 0) return null
    const total = subject.grades.reduce((acc, grade) => 
      acc + (grade.grade * grade.percentage / 100), 0
    )
    return total.toFixed(1)
  }

  const finalGrade = calculateFinalGrade()

  return (
    <>
      <div className="relative">
        {/* Tooltip de prerequisitos - Fuera de la tarjeta principal */}
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-[9999] w-64 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-2xl border border-gray-700">
              <div className="flex items-center gap-2 mb-2 border-b border-gray-700 pb-2">
                <Info size={14} className="text-primary-400" />
                <span className="font-bold">
                  {prerequisiteNames.length > 0 ? 'Prerequisitos:' : 'Sin prerequisitos'}
                </span>
              </div>
              {prerequisiteNames.length > 0 ? (
                <ul className="space-y-1">
                  {prerequisiteNames.map((name, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span className="text-primary-400">•</span>
                      <span className="leading-relaxed">{name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300 text-center py-1">
                  No tiene requisitos previos
                </p>
              )}
              {/* Flecha del tooltip */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
              </div>
            </div>
          </div>
        )}

        <div
          className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${getStatusColor()} relative`}
          onClick={() => setShowGradeModal(true)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Badge de categoría */}
          <div className={`absolute top-0 right-0 px-2 py-1 text-xs font-medium ${categoryColor.badge} rounded-bl-lg`}>
            {categoryColor.name.split(' ')[0]}
          </div>
        
        <div className="flex items-start justify-between mb-2 mt-4">
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">{subject.name}</h3>
            <p className="text-xs opacity-75">{subject.code}</p>
          </div>
          <div className="ml-2 flex gap-1">
            <Info size={16} className="text-gray-400" />
            {getStatusIcon()}
          </div>
        </div>

        {finalGrade && (
          <div className="mt-2 pt-2 border-t border-current border-opacity-20">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium">Promedio:</span>
              <span className={`text-sm font-bold ${
                parseFloat(finalGrade) >= 4.0 ? 'text-primary-700' : 'text-gray-600'
              }`}>
                {finalGrade}
              </span>
            </div>
          </div>
        )}

        <div className="mt-2 text-xs opacity-75">
          {subject.credits} créditos
        </div>
      </div>
      </div>

      {showGradeModal && (
        <GradeModal
          subject={subject}
          onClose={() => setShowGradeModal(false)}
          onUpdateStatus={onUpdateStatus}
          onUpdateGrades={onUpdateGrades}
        />
      )}
    </>
  )
}
