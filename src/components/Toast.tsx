import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-primary-50 border-primary-200 text-primary-800'
      case 'error':
        return 'bg-primary-50 border-primary-200 text-primary-800'
      case 'info':
        return 'bg-primary-50 border-primary-200 text-primary-800'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-primary-500" size={20} />
      case 'error':
        return <AlertCircle className="text-primary-500" size={20} />
      case 'info':
        return <Info className="text-primary-500" size={20} />
    }
  }

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 p-4 rounded-lg border-2 shadow-lg ${getStyles()} animate-slide-in`}>
      {getIcon()}
      <p className="flex-1 font-medium">{message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-black hover:bg-opacity-5 rounded-full transition"
      >
        <X size={18} />
      </button>
    </div>
  )
}
