'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Mock data
const userData = {
  mobile: '09123456789',
}

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    if (confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟')) {
      setLoading(true)
      // TODO: API call
      setTimeout(() => {
        setLoading(false)
        router.push('/login')
      }, 1000)
    }
  }

  return (
    <div dir="rtl" className="rtl">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-100 mb-8">پروفایل</h2>

        <div className="mt-6">
          <div className="glass-card rounded-xl overflow-hidden">
            <dl className="divide-y divide-white/5">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-300">شماره موبایل</dt>
                <dd className="mt-1 text-sm font-semibold text-gray-100 sm:col-span-2 sm:mt-0">{userData.mobile}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? 'در حال خروج...' : 'خروج'}
          </button>
        </div>
      </div>
    </div>
  )
}

