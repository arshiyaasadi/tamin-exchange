'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { validateMobile } from '@/lib/utils'

export default function LoginPage() {
  const router = useRouter()
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateMobile(mobile)) {
      setError('شماره موبایل وارد شده صحیح نیست')
      return
    }

    if (!password) {
      setError('لطفا رمز عبور را وارد کنید')
      return
    }

    setLoading(true)
    // TODO: API call
    try {
      // شبیه‌سازی API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setLoading(false)
      // استفاده از window.location برای اطمینان از تغییر صفحه
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      } else {
        router.replace('/')
      }
    } catch (error) {
      setLoading(false)
      setError('خطا در ورود به سیستم. لطفا دوباره تلاش کنید.')
    }
  }

  return (
    <div dir="rtl" className="flex min-h-screen flex-1 flex-col justify-center bg-slate-50 px-6 py-12 lg:px-8 rtl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          ورود به حساب کاربری
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">ورود / ادامه با شماره موبایل</p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="mobile" className="block text-sm/6 font-medium text-gray-900">
              شماره موبایل
            </label>
            <div className="mt-2">
              <input
                id="mobile"
                name="mobile"
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-600 sm:text-sm/6"
                placeholder="09123456789"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                رمز عبور
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-purple-600 hover:text-purple-500">
                  فراموشی رمز عبور؟
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-600 sm:text-sm/6"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-50"
            >
              {loading ? 'در حال ورود...' : 'ورود'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

