'use client'

import CountUp from '@/components/ui/CountUp'

const stats = [
  { id: 1, name: 'کاربران فعال', number: 5, suffix: '+ میلیون', prefix: '' },
  { id: 2, name: 'حجم معاملات روزانه', number: 100, suffix: '+ میلیارد', prefix: '' },
  { id: 3, name: 'بازارهای معاملاتی', number: 320, suffix: '+', prefix: '' },
  { id: 4, name: 'نرخ موفقیت تراکنش‌ها', number: 99.9, suffix: '%', prefix: '' },
]

export default function StatsSection() {
  return (
    <div dir="rtl" className="rtl bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="w-full">
          <h2 className="text-base/8 font-semibold text-primary-400">آمار و ارقام</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
            اعتماد میلیون‌ها کاربر
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            صرافی TWIN با عملکرد قابل اعتماد و امنیت بالا، انتخاب اول کاربران ایرانی است
          </p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group relative flex flex-col gap-y-3 p-6 rounded-xl glass-card hover:glass-light transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/10 border border-white/5 hover:border-primary-500/20 w-full"
            >
              <dt className="text-sm/6 text-gray-400 group-hover:text-gray-300 transition-colors">{stat.name}</dt>
              <dd className="order-first text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
                {stat.prefix}
                <CountUp to={stat.number} duration={2.5} delay={0.3} />
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
