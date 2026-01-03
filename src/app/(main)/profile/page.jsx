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
    <div dir="rtl" className="px-4 py-6 sm:px-6 lg:px-8 rtl">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-900">پروفایل</h2>

        <div className="mt-6">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">شماره موبایل</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{userData.mobile}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="w-full rounded-md bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-xs hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-50"
          >
            {loading ? 'در حال خروج...' : 'خروج'}
          </button>
        </div>
      </div>
    </div>
  )
}

