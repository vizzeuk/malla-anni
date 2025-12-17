import { SubjectWithStatus } from '../types'
import SubjectCard from './SubjectCard'
import { CheckCircle2 } from 'lucide-react'

interface SemesterGridProps {
  subjects: SubjectWithStatus[]
  onUpdateStatus: (subjectId: string, status: SubjectWithStatus['status']) => void
  onUpdateGrades: (subjectId: string, grades: any[]) => void
  onMarkYearComplete: (year: number) => void
}

export default function SemesterGrid({ 
  subjects, 
  onUpdateStatus, 
  onUpdateGrades,
  onMarkYearComplete 
}: SemesterGridProps) {
  const getSubjectsBySemester = (semester: number) => {
    return subjects.filter(s => s.semester === semester)
  }

  const years = [
    { year: 1, semesters: [1, 2], label: 'Año 1' },
    { year: 2, semesters: [3, 4], label: 'Año 2' },
    { year: 3, semesters: [5, 6], label: 'Año 3' },
    { year: 4, semesters: [7, 8], label: 'Año 4' },
    { year: 5, semesters: [9, 10], label: 'Año 5' },
  ]

  return (
    <div className="overflow-x-auto pb-4">
      <div className="inline-flex gap-6 min-w-full">
        {years.map((yearData) => {
          const yearSubjects = subjects.filter(s => yearData.semesters.includes(s.semester))
          const allApproved = yearSubjects.every(s => s.status === 'approved')
          
          return (
            <div key={yearData.year} className="flex-shrink-0 w-[500px] space-y-4">
              {/* Header del año con botón para marcar completo */}
              <div className="flex flex-col gap-3 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h2 className="text-lg font-semibold text-gray-900 text-center">
                  {yearData.label}
                </h2>

                <button
                  onClick={() => onMarkYearComplete(yearData.year)}
                  disabled={allApproved}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${
                    allApproved
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }`}
                >
                  <CheckCircle2 size={18} />
                  <span className="text-sm font-medium">
                    {allApproved ? 'Año Completo' : 'Marcar Completo'}
                  </span>
                </button>
              </div>

              {/* Grid de semestres */}
              <div className="space-y-4">
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
          )
        })}
      </div>
    </div>
  )
}
