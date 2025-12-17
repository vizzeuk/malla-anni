import { useState } from 'react'
import type { SubjectWithStatus, Grade } from '../types'
import { X, Plus, Trash2 } from 'lucide-react'

interface GradeModalProps {
  subject: SubjectWithStatus
  onClose: () => void
  onUpdateStatus: (subjectId: string, status: SubjectWithStatus['status']) => void
  onUpdateGrades: (subjectId: string, grades: Grade[]) => void
}

export default function GradeModal({ subject, onClose, onUpdateStatus, onUpdateGrades }: GradeModalProps) {
  const [status, setStatus] = useState(subject.status)
  const [grades, setGrades] = useState<Grade[]>(subject.grades || [])

  const addGrade = () => {
    const newGrade: Grade = {
      id: Date.now().toString(),
      name: '',
      grade: 0,
      percentage: 0
    }
    setGrades([...grades, newGrade])
  }

  const updateGrade = (id: string, field: keyof Grade, value: string | number) => {
    setGrades(grades.map(g => 
      g.id === id ? { ...g, [field]: value } : g
    ))
  }

  const removeGrade = (id: string) => {
    setGrades(grades.filter(g => g.id !== id))
  }

  const calculateFinalGrade = () => {
    if (grades.length === 0) return 0
    const totalPercentage = grades.reduce((acc, g) => acc + g.percentage, 0)
    if (totalPercentage !== 100) return null
    
    return grades.reduce((acc, g) => acc + (g.grade * g.percentage / 100), 0)
  }

  const handleSave = () => {
    onUpdateStatus(subject.id, status)
    onUpdateGrades(subject.id, grades)
    onClose()
  }

  const finalGrade = calculateFinalGrade()
  const totalPercentage = grades.reduce((acc, g) => acc + g.percentage, 0)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{subject.name}</h2>
            <p className="text-sm text-gray-600">{subject.code}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Estado del Ramo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado del Ramo
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setStatus('pending')}
                className={`p-3 rounded-lg border-2 transition ${
                  status === 'pending'
                    ? 'border-gray-500 bg-gray-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Pendiente
              </button>
              <button
                onClick={() => setStatus('in-progress')}
                className={`p-3 rounded-lg border-2 transition ${
                  status === 'in-progress'
                    ? 'border-pink-400 bg-pink-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                En Curso
              </button>
              <button
                onClick={() => setStatus('approved')}
                className={`p-3 rounded-lg border-2 transition ${
                  status === 'approved'
                    ? 'border-green-500 bg-green-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Aprobado
              </button>
              <button
                onClick={() => setStatus('failed')}
                className={`p-3 rounded-lg border-2 transition ${
                  status === 'failed'
                    ? 'border-red-500 bg-red-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Reprobado
              </button>
            </div>
          </div>

          {/* Notas */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Notas y Evaluaciones
              </label>
              <button
                onClick={addGrade}
                className="flex items-center gap-1 text-pink-600 hover:text-pink-700 text-sm"
              >
                <Plus size={16} />
                Agregar Nota
              </button>
            </div>

            <div className="space-y-3">
              {grades.map((grade) => (
                <div key={grade.id} className="flex gap-2 items-start">
                  <input
                    type="text"
                    placeholder="Nombre (ej: Solemne 1)"
                    value={grade.name}
                    onChange={(e) => updateGrade(grade.id, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  />
                  <input
                    type="number"
                    placeholder="Nota"
                    value={grade.grade || ''}
                    onChange={(e) => updateGrade(grade.id, 'grade', parseFloat(e.target.value) || 0)}
                    min="1"
                    max="7"
                    step="0.1"
                    className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  />
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      placeholder="%"
                      value={grade.percentage || ''}
                      onChange={(e) => updateGrade(grade.id, 'percentage', parseFloat(e.target.value) || 0)}
                      min="0"
                      max="100"
                      className="w-16 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                    />
                    <span className="text-gray-500">%</span>
                  </div>
                  <button
                    onClick={() => removeGrade(grade.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Resumen */}
            {grades.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Total Porcentaje:</span>
                  <span className={`font-bold ${
                    totalPercentage === 100 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {totalPercentage}%
                  </span>
                </div>
                {finalGrade !== null && (
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm font-medium">Promedio Final:</span>
                    <span className={`text-xl font-bold ${
                      finalGrade >= 4.0 ? 'text-green-600' : 'text-rose-600'
                    }`}>
                      {finalGrade.toFixed(1)}
                    </span>
                  </div>
                )}
                {totalPercentage !== 100 && (
                  <p className="text-xs text-rose-600 mt-2">
                    El porcentaje total debe sumar 100%
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t p-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition shadow-md"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
