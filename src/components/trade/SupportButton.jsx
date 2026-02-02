'use client'

import { PhoneIcon } from '@heroicons/react/24/outline'
import { config } from '@/lib/config'

export default function SupportButton({ label = config.supportLabel }) {
  return (
    <button
      type="button"
      className="fixed bottom-20 start-4 z-30 flex items-center gap-2 rounded-full bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 lg:start-6"
      dir="rtl"
    >
      <PhoneIcon className="size-5" />
      <span>{label}</span>
    </button>
  )
}
