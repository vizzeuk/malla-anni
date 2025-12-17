import { useState } from 'react'
import { SubjectWithStatus } from '../types'
import SubjectCard from './SubjectCard'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface YearViewProps {
  subjects: SubjectWithStatus[]
  onUpdateStatus: (subjectId: string, status: SubjectWithStatus['status']) => void
  onUpdateGrades: (subjectId: string, grades: any[]) => void
}

export default function YearView({ subjects, onUpdateStatus, onUpdateGrades }: YearViewProps) {
  const [expandedYear, setExpandedYear] = useState<number>(1)

  // Agrupar por año (cada año = 2 semestres)
  const years = [
    { year: 1, semesters: [1, 2], label: 'Año 1' },
    { year: 2, semesters: [3, 4], label: 'Año 2' },
    { year: 3, semesters: [5, 6], label: 'Año 3' },
    { year: 4, semesters: [7, 8], label: 'Año 4' },
    { year: 5, semesters: [9, 10], label: 'Año 5' },
  ]

  const getSubjectsBySemester = (semester: number) => {
    return subjects.filter(s => s.semester === semester)
  }

  const getYearProgress = (semesters: number[]) => {
    const yearSubjects = subjects.filter(s => semesters.includes(s.semester))
    const approved = yearSubjects.filter(s => s.status === 'approved').length
    return yearSubjects.length > 0 
      ? Math.round((approved / yearSubjects.length) * 100) 
      : 0
  }

  return (
    <div className="space-y-4">
      {years.map((yearData) => {
        const isExpanded = expandedYear === yearData.year
        const progress = getYearProgress(yearData.semesters)

        return (
          <div
            key={yearData.year}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            {/* Header del año */}
            <button
              onClick={() => setExpandedYear(isExpanded ? 0 : yearData.year)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition rounded-t-lg"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <span className="text-lg font-semibold text-primary-700">
                    {yearData.year}
                  </span>
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {yearData.label}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Semestre {yearData.semesters[0]} - {yearData.semesters[1]}
                  </p>
                </div>
              </div>

              {/* Barra de progreso del año */}
              <div className="flex items-center gap-4 mr-4">
                <div className="w-32 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-primary-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700 w-12">
                  {progress}%
                </span>
              </div>

              {/* Icono de expandir/colapsar */}
              <div className="text-gray-600">
                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </button>

            {/* Contenido de los semestres */}
            {isExpanded && (
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {yearData.semesters.map((semester) => {
                    const semesterSubjects = getSubjectsBySemester(semester)
                    
                    return (
                      <div key={semester} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                        <h3 className="text-base font-semibold text-center mb-4 pb-2 border-b border-gray-200 text-gray-900">
                          Semestre {semester}
                        </h3>
                        <div className="space-y-3 overflow-visible">
                          {semesterSubjects.length > 0 ? (
                            semesterSubjects.map((subject) => (
                              <SubjectCard
                                key={subject.id}
                                subject={subject}
                                onUpdateStatus={onUpdateStatus}
                                onUpdateGrades={onUpdateGrades}
                              />
                            ))
                          ) : (
                            <p className="text-center text-gray-400 text-sm py-4">
                              No hay ramos en este semestre
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
