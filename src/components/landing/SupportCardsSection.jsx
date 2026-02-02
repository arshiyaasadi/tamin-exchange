'use client'

import Link from 'next/link'
import { PhoneIcon, QuestionMarkCircleIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

const cards = [
  {
    id: 'support',
    icon: PhoneIcon,
    title: 'پشتیبانی ۲۴ ساعته ۷ روز هفته',
    description: 'تیم پشتیبانی همیشه و هر لحظه از شبانه‌روز پشتیبان شماست.',
    href: '#',
  },
  {
    id: 'faq',
    icon: QuestionMarkCircleIcon,
    title: 'پرسش‌های متداول',
    description: 'پاسخ سوالاتتان درباره TWIN، سرمایه‌گذاری و ترید را اینجا پیدا کنید.',
    href: '#',
  },
  {
    id: 'api',
    icon: CodeBracketIcon,
    title: 'مستندات API',
    description: 'اسناد مربوط به وب‌سرویس‌های TWIN را اینجا بخوانید.',
    href: '#',
  },
]

export default function SupportCardsSection() {
  return (
    <div dir="rtl" className="rtl bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group relative glass-card rounded-2xl p-6 hover:glass-light transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/10 border border-white/5 hover:border-primary-500/20 overflow-hidden w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-primary-500/0 group-hover:from-primary-600/5 group-hover:to-primary-500/5 transition-all duration-300" />
              <div className="relative flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600/20 to-primary-700/20 group-hover:from-primary-600/30 group-hover:to-primary-700/30 transition-all duration-300 shadow-lg shadow-primary-600/20 group-hover:shadow-xl group-hover:shadow-primary-600/30 group-hover:scale-110">
                  <card.icon className="size-7 text-primary-400 group-hover:text-primary-300 transition-colors" aria-hidden="true" />
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {card.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
