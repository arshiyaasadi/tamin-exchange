'use client'

import {
  ChartBarIcon,
  ArrowPathIcon,
  CreditCardIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline'
import CountUp from '@/components/ui/CountUp'

const features = [
  {
    name: 'بازارهای معاملاتی پیشرفته',
    description: (
      <>
        <CountUp to={320} duration={2} delay={0.2} />
        + بازار معاملاتی در پایه‌بازارهای تومان و تتر با ابزارهای تحلیلی پیشرفته و نمودارهای قیمتی
      </>
    ),
    icon: ChartBarIcon,
  },
  {
    name: 'خرید و فروش آنی',
    description: 'خرید و فروش آنی و آسان TWIN با رابط کاربری ساده و سریع برای تجربه معاملاتی بهتر',
    icon: ArrowPathIcon,
  },
  {
    name: 'اعتبار معاملاتی',
    description: 'دریافت اعتبار معاملاتی و طرح‌های ویژه برای به‌دست‌آوردن سود بیشتر در معاملات',
    icon: CreditCardIcon,
  },
  {
    name: 'API پیشرفته',
    description: 'بهره‌مندی از تمام امکانات صرافی TWIN با استفاده از API پیشرفته برای کاربران حرفه‌ای',
    icon: CodeBracketIcon,
  },
]

export default function FeaturesSection() {
  return (
    <div dir="rtl" className="rtl bg-slate-900 py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-primary-400">امکانات</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">
            امکانات پیشرفته برای معاملات
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            ابزارهای مدرن و پیشرفته برای انجام معاملات با امنیت و سرعت بالا
          </p>
        </div>
        <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 w-full">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2 w-full">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group relative flex flex-col p-6 rounded-xl glass-card hover:glass-light transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/10 border border-white/5 hover:border-primary-500/20 w-full"
              >
                <dt className="text-base/7 font-semibold text-white mb-4">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 shadow-lg shadow-primary-600/30 group-hover:shadow-xl group-hover:shadow-primary-600/40 transition-all duration-300 group-hover:scale-110">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base/7 text-gray-300 leading-relaxed">
                  <p className="flex-auto">{typeof feature.description === 'string' ? feature.description : feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
