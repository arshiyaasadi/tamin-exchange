'use client'

import { useState } from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

export default function SEOSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div dir="rtl" className="rtl bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/5">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">صرافی ارز دیجیتال چیست و چطور کار می‌کند؟</h2>
            <p className="text-gray-300 mb-4">
              فعالیت در دنیای کریپتوکارنسی به یک بستر امن، سریع و راحت نیاز دارد که انواع صرافی ارز دیجیتال این فضا
              را برای تریدرها و سرمایه‌گذاران، فراهم می‌کنند. صرافی ارز دیجیتال،{' '}
              <em>پلتفرمی است که امکان معامله، مبادله و انجام انواع تراکنش‌های مالی با ارزهای دیجیتال را در اختیار ما می‌گذارد.</em>
            </p>
            <p className="text-gray-300 mb-4">
              صرافی‌های ارز دیجیتال در دو دسته‌بندی اصلی یعنی <strong>صرافی ارز دیجیتال متمرکز</strong> و{' '}
              <strong>صرافی ارز دیجیتال غیرمتمرکز</strong> قرار می‌گیرند. هر کدام از این مدل‌ها، مزایای اختصاصی خود را
              دارند و افراد بر اساس نیاز و نوع کار خود، باید یکی از آن‌ها را انتخاب کنند.
            </p>
            {isExpanded && (
              <>
                <p className="text-gray-300 mb-4">
                  صرافی متمرکز یک محیط امن، قابل اطمینان و کامل برای انجام انواع تراکنش‌های مالی را فراهم می‌کند. در
                  صرافی متمرکز، یک فرد یا مجموعه به‌عنوان واسط، به تمام معامله‌ها نظارت دارد و به همین خاطر، احتمال
                  کلاهبرداری، سرقت و هر گونه خطر از دست رفتن سرمایه، به کمترین میزان ممکن می‌رسد. پشتیبانی کامل و دقیق
                  و امکان بررسی تمام تراکنش‌های پیشین، بخشی از مهم‌ترین ویژگی‌های این نوع صرافی است.
                </p>
                <p className="text-gray-300 mb-4">
                  در طرف مقابل، صرافی‌های غیر متمرکز (DEX) وجود دارند. این صرافی‌ها بدون نهاد واسط فعالیت می‌کنند. در
                  این صرافی‌ها، افراد می‌توانند به‌صورت کاملا همتا به همتا (P2P) با هم معامله کنند و برای افراد
                  حرفه‌ای، استفاده از این صرافی‌ها مناسب‌تر است.
                </p>
                <h3 className="text-xl font-semibold text-white mt-6 mb-4">چرا باید صرافی TWIN را انتخاب کنم؟</h3>
                <p className="text-gray-300 mb-4">
                  در میان صرافی‌های معتبر، TWIN توانسته با ویژگی‌های خود، به یکی از بهترین صرافی‌ها برای کاربران تبدیل
                  شود. TWIN با ارائه پیشرفته‌ترین امکانات، پلتفرمی کارآمد در سطح برترین صرافی‌های معتبر جهانی ایجاد
                  کرده است که امکان ترید کردن و انجام انواع تراکنش به ساده‌ترین روش را برای همگان امکان‌پذیر می‌کند.
                </p>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
          >
            {isExpanded ? (
              <>
                <span>نمایش کمتر</span>
                <ChevronUpIcon className="size-5" />
              </>
            ) : (
              <>
                <span>نمایش بیشتر</span>
                <ChevronDownIcon className="size-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
