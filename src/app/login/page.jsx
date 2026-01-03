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
    <div dir="rtl" className="flex min-h-screen flex-1 flex-col justify-center bg-slate-900 px-6 py-12 lg:px-8 rtl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-100">
          ورود به حساب کاربری
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">ورود / ادامه با شماره موبایل</p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="mobile" className="block text-sm/6 font-medium text-gray-200 mb-2">
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
                className="glass-input block w-full rounded-xl px-4 py-3 text-base text-gray-100 placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                placeholder="09123456789"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-200">
                رمز عبور
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
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
                className="glass-input block w-full rounded-xl px-4 py-3 text-base text-gray-100 placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
              />
            </div>
          </div>

          {error && (
            <div className="glass-light rounded-xl p-4 border border-red-400/30">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-xl bg-purple-600 px-4 py-3.5 text-sm/6 font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'در حال ورود...' : 'ورود'}
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

