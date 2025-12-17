import { CATEGORY_COLORS } from '../types'

export default function CategoryLegend() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-pink-100">
      <h3 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
        Categorías de Ramos
      </h3>
      <div className="space-y-2">
        {Object.entries(CATEGORY_COLORS).map(([key, color]) => (
          <div key={key} className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded ${color.badge}`}></div>
            <span className="text-sm text-gray-700">{color.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
