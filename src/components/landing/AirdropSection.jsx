'use client'

import { useState } from 'react'
import Link from 'next/link'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { normalizeNumericInput } from '@/lib/utils'

export default function AirdropSection() {
  const [code, setCode] = useState('')
  const [showFAQ, setShowFAQ] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: API call
    alert('کد بررسی شد')
  }

  return (
    <div dir="rtl" className="rtl bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-primary-500/5" />
          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 shadow-lg shadow-primary-600/30">
                  <span className="text-xl">🎁</span>
                </div>
                <span className="text-2xl font-bold text-white">ایردراپ روزانه TWIN</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">کد امروز رو وارد کنید و جایزه بگیرید.</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={code}
                  onChange={(e) => setCode(normalizeNumericInput(e.target.value, false))}
                  placeholder="کد را وارد کنید"
                  className="flex-1 rounded-xl glass-input px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-500/50 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="group relative rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10">بررسی ایردراپ</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </form>
              <p className="text-xs text-gray-500 mb-6">
                با دنبال کردن شبکه‌های اجتماعی TWIN، روزانه ایردراپ نامحدود دریافت کنید.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg glass hover:glass-light transition-all duration-200 hover:scale-105"
                >
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">تلگرام</span>
                </Link>
                <Link
                  href="#"
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg glass hover:glass-light transition-all duration-200 hover:scale-105"
                >
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">اینستاگرام</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative aspect-square w-40 rounded-2xl bg-gradient-to-br from-primary-600/30 via-primary-500/20 to-primary-400/10 flex items-center justify-center overflow-hidden shadow-xl shadow-primary-500/20 border border-primary-500/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.3),transparent_70%)]" />
                <span className="relative z-10 text-4xl">🎁</span>
              </div>
            </div>
          </div>
          <div className="relative mt-8 pt-8 border-t border-white/10">
            <button
              type="button"
              onClick={() => setShowFAQ(!showFAQ)}
              className="group flex items-center gap-3 text-sm font-semibold text-white hover:text-primary-300 transition-all duration-200"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary-600/20 group-hover:bg-primary-600/30 transition-colors">
                <QuestionMarkCircleIcon className="size-5 text-primary-400" />
              </div>
              <span>چطور می‌تونم جایزه رو دریافت کنم؟</span>
            </button>
            {showFAQ && (
              <p className="mt-4 text-sm text-gray-400 leading-relaxed pe-11">
                شما می‌تونید هر روز با ثبت کد مخصوصی که در شبکه‌های اجتماعی TWIN قرار می‌گیره، جایزه بگیرید. پس از
                ثبت کد درست، ۳۰ ثانیه در صفحه بمونید تا ارزدیجیتال رایگان به کیف پولتون واریز بشه.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
