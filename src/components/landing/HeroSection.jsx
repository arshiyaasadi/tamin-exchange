'use client'

import Link from 'next/link'
import {
  CheckCircleIcon,
  BoltIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'
import GradientText from '@/components/ui/GradientText'
import Aurora from '@/components/ui/Aurora'
import CountUp from '@/components/ui/CountUp'

const features = [
  { name: '+۵ میلیون کاربر', icon: CheckCircleIcon, number: 5, suffix: ' میلیون کاربر', prefix: '+' },
  { name: 'معامله آنی', icon: BoltIcon },
  { name: 'کارمزد صفر', icon: CurrencyDollarIcon },
  { name: 'امنیت بالا', icon: ShieldCheckIcon },
]

export default function HeroSection() {
  return (
    <div dir="rtl" className="rtl relative isolate overflow-hidden bg-slate-900">
      <Aurora
        colorStops={['#6B21A8', '#7E22CE', '#9333EA']}
        amplitude={0.8}
        blend={0.4}
        speed={0.8}
      />
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_left,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="hero-pattern"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-slate-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#hero-pattern)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      <div
        aria-hidden="true"
        className="absolute top-10 start-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:start-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:start-48 xl:start-[calc(50%-24rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
          className="aspect-1108/632 w-[69.25rem] bg-gradient-to-r from-primary-600/20 to-primary-500/20 opacity-30"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-2 text-sm/6 font-semibold text-primary-400 ring-1 ring-primary-500/20 ring-inset">
              <span>
                رتبه{' '}
                <CountUp to={1} duration={1.5} delay={0.1} />
                {' '}حجم معاملات TWIN
              </span>
            </div>
          </div>
          <h1 className="mt-10 text-5xl font-bold tracking-tight text-pretty sm:text-7xl">
            <GradientText
              className="text-5xl sm:text-7xl font-bold"
              colors={['#F8FAFC', '#E9D5FF', '#D8B4FE', '#C084FC']}
              animationSpeed={10}
              direction="horizontal"
            >
              صرافی ارز دیجیتال{' '}
            </GradientText>
            <GradientText
              className="text-5xl sm:text-7xl font-bold"
              colors={['#7E22CE', '#9333EA', '#A855F7', '#C084FC']}
              animationSpeed={8}
              direction="horizontal"
            >
              TWIN
            </GradientText>
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8 leading-relaxed">
            تجربه کاربری ساده و موبایل‌فرست با عملکرد سریع و قابل اعتماد برای خرید و فروش ارز TWIN
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/login"
              className="group relative rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">ثبت‌نام</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="#features"
              className="group inline-flex items-center gap-2 text-sm/6 font-semibold text-gray-300 hover:text-white transition-all duration-200"
            >
              <span>بیشتر بدانید</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1">
                ←
              </span>
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group flex items-center gap-3 p-3 rounded-lg glass hover:glass-light transition-all duration-200 hover:scale-105"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary-600/20 group-hover:bg-primary-600/30 transition-colors">
                  <feature.icon className="size-5 text-primary-400" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                  {feature.number !== undefined ? (
                    <>
                      {feature.prefix}
                      <CountUp to={feature.number} duration={2} delay={0.2} />
                      {feature.suffix}
                    </>
                  ) : (
                    feature.name
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative start-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary-600/20 to-primary-500/20 opacity-30 sm:start-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  )
}
