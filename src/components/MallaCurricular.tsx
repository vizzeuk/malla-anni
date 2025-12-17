import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { NURSING_SUBJECTS } from '../data/subjects'
import type { SubjectWithStatus } from '../types'
import CategoryLegend from './CategoryLegend'
import ProgressBar from './ProgressBar'
import StatsSummary from './StatsSummary'
import SemesterGrid from './SemesterGrid'
import { useToast } from '../hooks/useToast'
import { LogOut, User, Stethoscope } from 'lucide-react'

export default function MallaCurricular() {
  const [subjects, setSubjects] = useState<SubjectWithStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const { showToast } = useToast()

  useEffect(() => {
    loadSubjects()
    getCurrentUser()
  }, [])

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUsername(user.user_metadata?.username || user.email || '')
    }
  }

  const loadSubjects = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      // Cargar estados y notas de Supabase
      const { data: statusData } = await supabase
        .from('subject_status')
        .select('*')
        .eq('user_id', user.id) as any

      const { data: gradesData } = await supabase
        .from('grades')
        .select('*')
        .eq('user_id', user.id) as any

      // Combinar datos
      const subjectsWithStatus: SubjectWithStatus[] = NURSING_SUBJECTS.map(subject => {
        const status = statusData?.find((s: any) => s.subject_id === subject.id)
        const subjectGrades = gradesData?.filter((g: any) => g.subject_id === subject.id) || []

        return {
          ...subject,
          status: status?.status || 'pending',
          finalGrade: status?.final_grade || null,
          grades: subjectGrades.map((g: any) => ({
            id: g.id,
            name: g.name,
            grade: g.grade,
            percentage: g.percentage
          }))
        }
      })

      setSubjects(subjectsWithStatus)
    } catch (error) {
      console.error('Error loading subjects:', error)
      showToast('Error al cargar los ramos', 'error')
    } finally {
      setLoading(false)
    }
  }

  const updateSubjectStatus = async (subjectId: string, status: SubjectWithStatus['status']) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // @ts-ignore
      const { error } = await supabase
        .from('subject_status')
        .upsert({
          user_id: user.id,
          subject_id: subjectId,
          status,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,subject_id'
        })

      if (error) throw error
      await loadSubjects()
      showToast('Estado actualizado correctamente', 'success')
    } catch (error) {
      console.error('Error updating status:', error)
      showToast('Error al actualizar el estado', 'error')
    }
  }

  const updateSubjectGrades = async (subjectId: string, grades: any[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Eliminar notas anteriores
      await supabase
        .from('grades')
        .delete()
        .eq('user_id', user.id)
        .eq('subject_id', subjectId)

      // Insertar nuevas notas
      if (grades.length > 0) {
        // @ts-ignore
        const { error } = await supabase
          .from('grades')
          .insert(
            grades.map(g => ({
              user_id: user.id,
              subject_id: subjectId,
              name: g.name,
              grade: g.grade,
              percentage: g.percentage
            }))
          )

        if (error) throw error
      }

      await loadSubjects()
      showToast('Notas guardadas correctamente', 'success')
    } catch (error) {
      console.error('Error updating grades:', error)
      showToast('Error al guardar las notas', 'error')
    }
  }

  const markYearComplete = async (year: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Determinar los semestres del año
      const semesters = [year * 2 - 1, year * 2]
      
      // Obtener todos los ramos del año
      const yearSubjects = subjects.filter(s => semesters.includes(s.semester))
      
      // Marcar todos como aprobados
      const updates = yearSubjects.map(subject => ({
        user_id: user.id,
        subject_id: subject.id,
        status: 'approved' as const,
        updated_at: new Date().toISOString()
      }))

      // @ts-ignore
      const { error } = await supabase
        .from('subject_status')
        .upsert(updates, {
          onConflict: 'user_id,subject_id'
        })

      if (error) throw error
      
      await loadSubjects()
      showToast(`Año ${year} marcado como completo`, 'success')
    } catch (error) {
      console.error('Error marking year complete:', error)
      showToast('Error al marcar el año completo', 'error')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando malla curricular...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary-100 p-2.5 rounded-lg">
              <Stethoscope className="text-primary-500" size={24} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Malla Curricular Anni</h1>
              <p className="text-sm text-gray-500">Enfermería</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-primary-50 px-3 py-2 rounded-lg border border-primary-100">
              <User size={18} className="text-primary-500" />
              <span className="font-medium">{username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
            >
              <LogOut size={18} />
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Malla */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Panel superior con progreso y estadísticas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ProgressBar subjects={subjects} />
          <StatsSummary subjects={subjects} />
        </div>

        {/* Leyenda de categorías */}
        <div className="mb-6">
          <CategoryLegend />
        </div>

        {/* Grid de semestres */}
        <SemesterGrid
          subjects={subjects}
          onUpdateStatus={updateSubjectStatus}
          onUpdateGrades={updateSubjectGrades}
          onMarkYearComplete={markYearComplete}
        />
      </div>
    </div>
  )
}