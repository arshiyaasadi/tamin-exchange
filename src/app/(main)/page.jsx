'use client'

import { formatNumber, formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/20/solid'

// #region agent log
if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7242/ingest/fa5c7cac-c895-4621-801d-ec8cb1014246',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.jsx:6',message:'PortfolioPage client component loading',data:{isClient:typeof window !== 'undefined',route:'/(main)/page'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{}); }
// #endregion

// Mock data - در آینده از API گرفته می‌شود
const portfolioData = {
  twinAmount: 1250.5,
  tomanValue: 12500000,
  priceChange: 2.5,
  currentPrice: 10000,
}

const recentTransactions = [
  { id: 1, type: 'buy', amount: 100, price: 9800, date: new Date('2024-01-15T10:30:00') },
  { id: 2, type: 'sell', amount: 50, price: 10200, date: new Date('2024-01-14T15:20:00') },
  { id: 3, type: 'buy', amount: 200, price: 9500, date: new Date('2024-01-13T09:15:00') },
]

export default function PortfolioPage() {
  // #region agent log
  if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7242/ingest/fa5c7cac-c895-4621-801d-ec8cb1014246',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.jsx:22',message:'PortfolioPage function entry',data:{twinAmount:portfolioData.twinAmount},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{}); }
  // #endregion
  const hasAssets = portfolioData.twinAmount > 0

  const stats = [
    { name: 'مقدار TWIN', stat: formatNumber(portfolioData.twinAmount) },
    { name: 'معادل تومان', stat: formatPrice(portfolioData.tomanValue) },
    {
      name: 'تغییرات قیمت',
      stat: `${portfolioData.priceChange > 0 ? '+' : ''}${portfolioData.priceChange}%`,
      color: portfolioData.priceChange > 0 ? 'text-green-600' : 'text-red-600',
    },
  ]

  return (
    <div dir="rtl" className="rtl">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-100 mb-8">دارایی شما</h2>

        {hasAssets ? (
          <>
            <div className="mt-6">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.name} className="glass-card rounded-xl px-4 py-5 sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-400">{item.name}</dt>
                    <dd className={`mt-2 text-3xl font-bold tracking-tight ${item.color || 'text-gray-100'}`}>
                      {item.stat}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">قیمت لحظه‌ای TWIN</h3>
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-100">{formatPrice(portfolioData.currentPrice)}</span>
                  </div>
                  <span className={`text-base font-semibold px-3 py-1 rounded-lg ${
                    portfolioData.priceChange > 0 
                      ? 'text-green-400 bg-buy-glass' 
                      : 'text-red-400 bg-sell-glass'
                  }`}>
                    {portfolioData.priceChange > 0 ? '+' : ''}
                    {portfolioData.priceChange}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">تراکنش‌های اخیر</h3>
              <div className="glass-card rounded-xl overflow-hidden">
                <ul role="list" className="divide-y divide-white/5">
                  {recentTransactions.map((transaction) => (
                    <li key={transaction.id} className="flex items-center justify-between gap-x-6 px-4 py-5 sm:px-6 hover:bg-white/5 transition-colors">
                      <div className="flex min-w-0 gap-x-4">
                        <div className={`flex size-10 items-center justify-center rounded-lg ${
                          transaction.type === 'buy' 
                            ? 'bg-buy-glass text-buy-DEFAULT' 
                            : 'bg-sell-glass text-sell-DEFAULT'
                        }`}>
                          <span className="text-sm font-bold">
                            {transaction.type === 'buy' ? 'خرید' : 'فروش'}
                          </span>
                        </div>
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold text-gray-100">
                            {transaction.type === 'buy' ? 'خرید' : 'فروش'} <span className="text-gray-300">{formatNumber(transaction.amount)}</span> <span className="text-gray-400 text-xs">TWIN</span>
                          </p>
                          <p className="mt-1 truncate text-xs text-gray-400">
                            {new Intl.DateTimeFormat('fa-IR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }).format(transaction.date)}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 text-end">
                        <p className="text-sm font-bold text-gray-100">{formatPrice(transaction.price)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-12 text-center glass-card rounded-xl p-8">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="mx-auto size-12 text-gray-400"
            >
              <path
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="mt-4 text-sm font-semibold text-gray-200">هنوز TWIN ندارید</h3>
            <p className="mt-2 text-sm text-gray-400">برای شروع معامله، به صفحه معامله بروید</p>
            <div className="mt-6">
              <Link
                href="/trade"
                className="inline-flex items-center rounded-xl glass-light px-4 py-2.5 text-sm font-semibold text-gray-100 hover:bg-white/10 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400/50"
              >
                <PlusIcon aria-hidden="true" className="me-1.5 -ms-0.5 size-5" />
                شروع معامله
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

