'use client'

import Link from 'next/link'

const navigation = {
  guide: [
    { name: 'نحوه ثبت نام', href: '#' },
    { name: 'نحوه واریز', href: '#' },
    { name: 'نحوه معامله', href: '#' },
    { name: 'سوالات متداول', href: '#' },
    { name: 'تغییر شماره موبایل', href: '#' },
  ],
  services: [
    { name: 'دعوت از دوستان', href: '#' },
    { name: 'دانلود اپلیکیشن', href: '#' },
    { name: 'تحلیل ارز دیجیتال', href: '#' },
    { name: 'ماشین‌ حساب ارز دیجیتال', href: '#' },
    { name: 'ثبت‌نام حقوقی', href: '#' },
  ],
  company: [
    { name: 'درباره TWIN', href: '#' },
    { name: 'فرصت‌های شغلی', href: '#' },
    { name: 'کارمزد', href: '#' },
    { name: 'قوانین', href: '#' },
  ],
  buy: [
    { name: 'خرید ارز دیجیتال', href: '#' },
    { name: 'خرید TWIN', href: '#' },
    { name: 'خرید تتر', href: '#' },
  ],
}

export default function LandingFooter() {
  return (
    <footer dir="rtl" className="rtl bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div>
            <Link href="/" className="group inline-block">
              <span className="text-2xl font-bold text-white bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent group-hover:from-primary-300 group-hover:to-primary-400 transition-all duration-300">
                TWIN
              </span>
            </Link>
            <p className="mt-4 text-sm/6 text-gray-400 leading-relaxed">
              صرافی ارز دیجیتال TWIN - تجربه معاملاتی امن و سریع
            </p>
            <p className="mt-4 text-sm/6 text-gray-400">
              <a href="tel:02191006555" className="hover:text-white transition-colors">
                021-91006555
              </a>
            </p>
            <p className="mt-2 text-sm/6 text-gray-400">
              <a href="mailto:support@twin.ir" className="hover:text-white transition-colors">
                support@twin.ir
              </a>
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-white">راهنمای استفاده</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.guide.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm/6 text-gray-400 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-white">خدمات مشتریان</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm/6 text-gray-400 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-white">TWIN</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm/6 text-gray-400 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-white">خرید ارزهای دیجیتال</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.buy.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm/6 text-gray-400 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-center text-sm/6 text-gray-400">
            &copy; {new Date().getFullYear()} صرافی TWIN. کلیه حقوق مادی و معنوی این سایت متعلق به TWIN است.
          </p>
        </div>
      </div>
    </footer>
  )
}
