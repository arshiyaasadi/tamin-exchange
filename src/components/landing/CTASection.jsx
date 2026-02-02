'use client'

import Link from 'next/link'

export default function CTASection() {
  return (
    <div dir="rtl" className="rtl relative isolate bg-slate-900 px-6 py-24 sm:py-32 lg:px-8">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_left,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={0}
            id="cta-pattern"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={0} className="overflow-visible fill-slate-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#cta-pattern)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
          className="aspect-1108/632 w-[69.25rem] flex-none bg-gradient-to-r from-primary-600/20 to-primary-500/20 opacity-20"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center w-full">
          <h2 className="text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl bg-gradient-to-r from-white via-white to-primary-300 bg-clip-text text-transparent">
            شروع معامله در صرافی{' '}
            <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
              TWIN
            </span>
          </h2>
          <p className="mx-auto mt-6 text-lg/8 text-gray-300 leading-relaxed max-w-2xl">
            در کمتر از پنج دقیقه ثبت نام و معامله در پرسودترین بازارها را آغاز کنید
          </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-white to-gray-100 px-6 py-3.5 text-sm font-bold text-gray-900 shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">ثبت‌نام رایگان</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <Link
            href="#features"
            className="group inline-flex items-center gap-2 text-sm/6 font-semibold text-white hover:text-primary-300 transition-all duration-200"
          >
            <span>بیشتر بدانید</span>
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}
