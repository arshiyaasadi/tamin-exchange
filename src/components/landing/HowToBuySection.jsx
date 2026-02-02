'use client'

import { useState } from 'react'
import Link from 'next/link'

const steps = [1, 2, 3, 4]

export default function HowToBuySection() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <div dir="rtl" className="rtl bg-slate-900 py-24 sm:py-32" id="how-to-buy">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-br from-primary-600/30 via-primary-500/20 to-primary-400/10 flex items-center justify-center overflow-hidden shadow-2xl shadow-primary-500/20 border border-primary-500/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.3),transparent_70%)]" />
              <span className="relative z-10 text-gray-300 text-sm font-medium">تصویر ثبت‌نام</span>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
              چطور ارز دیجیتال بخریم؟
            </h2>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">
                ثبت نام در <span className="text-primary-400">TWIN</span> در کمتر از ۵ دقیقه
              </h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                فرآیند ثبت نام و احراز هویت پایه در TWIN بسیار سریع است. برای دسترسی به کیف پول و بازارها کافی است
                ثبت نام اولیه را انجام دهید.
              </p>
              <div className="flex items-center gap-3 mb-6">
                {steps.map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setActiveStep(step)}
                    className={`group flex size-12 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                      activeStep === step
                        ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-600/30 scale-110'
                        : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:scale-105'
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
              <Link
                href="/login"
                className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">شروع ثبت‌نام</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
