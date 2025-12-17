import { SubjectWithStatus } from '../types'
import { TrendingUp, Heart, Star, Sparkles, Award } from 'lucide-react'

interface ProgressBarProps {
  subjects: SubjectWithStatus[]
}

export default function ProgressBar({ subjects }: ProgressBarProps) {
  const totalSubjects = subjects.length
  const approvedSubjects = subjects.filter(s => s.status === 'approved').length
  const percentage = totalSubjects > 0 ? Math.round((approvedSubjects / totalSubjects) * 100) : 0

  const getMotivationalMessage = () => {
    if (percentage === 0) {
      return {
        message: "Comienza tu aventura en enfermería. Cada gran logro comienza con el primer paso.",
        icon: <Heart className="text-primary-500" size={20} />
      }
    } else if (percentage < 25) {
      return {
        message: "Excelente inicio. Cada ramo aprobado es un paso más cerca de tu sueño.",
        icon: <Sparkles className="text-primary-500" size={20} />
      }
    } else if (percentage < 50) {
      return {
        message: "Vas muy bien. Ya llevas un cuarto de tu carrera. Sigue así.",
        icon: <Star className="text-primary-500" size={20} />
      }
    } else if (percentage < 75) {
      return {
        message: "Más de la mitad completada. Tu dedicación y esfuerzo están dando frutos.",
        icon: <TrendingUp className="text-primary-500" size={20} />
      }
    } else if (percentage < 100) {
      return {
        message: "Casi lo logras. La meta está muy cerca.",
        icon: <Award className="text-primary-500" size={20} />
      }
    } else {
      return {
        message: "Felicitaciones. Has completado tu carrera de enfermería.",
        icon: <Award className="text-primary-500" size={20} />
      }
    }
  }

  const motivational = getMotivationalMessage()

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        {motivational.icon}
        <h3 className="text-lg font-semibold text-gray-900">
          Progreso de Carrera
        </h3>
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            {approvedSubjects} de {totalSubjects} ramos completados
          </span>
          <span className="text-xl font-semibold text-gray-900">
            {percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-primary-500 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Mensaje motivacional */}
      <div className="bg-primary-50 rounded-lg p-3 border border-primary-100">
        <p className="text-sm text-gray-700 text-center">
          {motivational.message}
        </p>
      </div>
    </div>
  )
}
