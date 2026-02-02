'use client'

const benefits = [
  'راهی مطمئن برای ورودی مطمئن به بازارهای بدون مرز جهانی',
  'شفافیت و غیرمتمرکز بودن بازار رمزارزها',
  'حفظ ارزش دارایی در برابر تورم و بحران‌های اقتصادی',
  'تراکنش‌های سریع با کمترین کارمزد',
]

export default function InvestmentSection() {
  return (
    <div dir="rtl" className="rtl bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-br from-primary-600/30 via-primary-500/20 to-primary-400/10 flex items-center justify-center overflow-hidden shadow-2xl shadow-primary-500/20 border border-primary-500/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.3),transparent_70%)]" />
              <span className="relative z-10 text-gray-300 text-sm font-medium">تصویر سرمایه‌گذاری</span>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
              سرمایه‌گذاری روی رمزارزها،{' '}
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                سرمایه‌گذاری روی آینده
              </span>
            </h2>
            <div className="mt-8 space-y-5">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-lg glass hover:glass-light transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-700 shadow-lg shadow-primary-600/30 group-hover:shadow-xl group-hover:shadow-primary-600/40 transition-all duration-300 group-hover:scale-110 mt-0.5">
                    <svg
                      className="size-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                    {benefit}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
