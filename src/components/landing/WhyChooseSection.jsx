'use client'

import {
  Cog6ToothIcon,
  ChartBarSquareIcon,
  WalletIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import CountUp from '@/components/ui/CountUp'

const features = [
  {
    name: 'امکانات پیشرفته برای معاملات',
    description:
      'ابزارهای مدرن برای انجام معاملات از جمله حد سود و ضرر، پنل گزارش سود و زیان، امکان تنظیم هشدار قیمت و همچنین نمودارهای قیمتی و ابزارهای تحلیل بازار در اختیار شماست.',
    icon: Cog6ToothIcon,
  },
  {
    name: 'عمق بازار و حجم معاملات بالا',
    description: (
      <>
        با بیش از{' '}
        <CountUp to={1} duration={2} delay={0.2} />
        {' '}میلیون کاربر فعال، معامله خود را در سریع‌ترین زمان ممکن انجام دهید.
      </>
    ),
    icon: ChartBarSquareIcon,
  },
  {
    name: 'کیف‌پول اختصاصی',
    description:
      'دارایی‌های شما در کیف‌پول اختصاصی به صورت سرد نگه‌داری می‌شود و دربرابر حمله‌های مختلف امنیت دارد.',
    icon: WalletIcon,
  },
  {
    name: 'سپرهای امنیتی مدرن',
    description:
      'تیم امنیتی پیشرفته با ابزارهای مدرن و به‌روز، همواره برای حفظ امنیت دارایی کاربران تلاش می‌کنند. ذخیره امن دارایی کاربران در کیف پول‌های سرد و تایید هویت دو عاملی از جمله این ابزارها هستند.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'تنوع کوین و سبد معاملات',
    description:
      'معامله‌ی بهترین کوین‌های بازار در سه پایه بازار متفاوت و متنوع‌تر شدن سبد معاملات، یک ویژگی مهم برای کاربران حرفه‌ای است.',
    icon: Squares2X2Icon,
  },
  {
    name: 'پشتیبانی حرفه‌ای',
    description:
      'پشتیبانی حرفه‌ای و ۲۴ ساعته‌ی آنلاین و تلفنی، خیال کاربران را برای پاسخ به هر سوالی آسوده می‌کند.',
    icon: PhoneIcon,
  },
]

export default function WhyChooseSection() {
  return (
    <div dir="rtl" className="rtl bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="w-full">
          <h2 className="text-base/7 font-semibold text-primary-400">چرا TWIN؟</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
            بهترین انتخاب برای معاملات ارز دیجیتال
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            با صرافی TWIN، تجربه معاملاتی امن، سریع و حرفه‌ای را تجربه کنید
          </p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-6 text-base/7 text-gray-300 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 w-full">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group relative p-6 rounded-xl glass-card hover:glass-light transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/10 border border-white/5 hover:border-primary-500/20 w-full"
            >
              <dt className="inline font-semibold text-white mb-3 block">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary-600/20 group-hover:bg-primary-600/30 transition-colors">
                    <feature.icon aria-hidden="true" className="size-5 text-primary-400" />
                  </div>
                  <span>{feature.name}</span>
                </div>
              </dt>
              <dd className="inline text-gray-400 leading-relaxed">
                {typeof feature.description === 'string' ? feature.description : feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
