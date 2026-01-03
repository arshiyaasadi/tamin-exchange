'use client'

import { formatNumber, formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/20/solid'

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
    <div dir="rtl" className="px-4 py-6 sm:px-6 lg:px-8 rtl">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-900">دارایی شما</h2>

        {hasAssets ? (
          <>
            <div className="mt-6">
              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                    <dd className={`mt-1 text-3xl font-semibold tracking-tight ${item.color || 'text-gray-900'}`}>
                      {item.stat}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900">قیمت لحظه‌ای TWIN</h3>
              <div className="mt-4 rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(portfolioData.currentPrice)}</span>
                  <span className={`text-sm font-medium ${portfolioData.priceChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {portfolioData.priceChange > 0 ? '+' : ''}
                    {portfolioData.priceChange}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900">تراکنش‌های اخیر</h3>
              <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
                <ul role="list" className="divide-y divide-gray-100">
                  {recentTransactions.map((transaction) => (
                    <li key={transaction.id} className="flex items-center justify-between gap-x-6 px-4 py-5 sm:px-6">
                      <div className="flex min-w-0 gap-x-4">
                        <div className={`flex size-10 items-center justify-center rounded-full ${transaction.type === 'buy' ? 'bg-green-100' : 'bg-red-100'}`}>
                          <span className={`text-sm font-semibold ${transaction.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'buy' ? 'خرید' : 'فروش'}
                          </span>
                        </div>
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold text-gray-900">
                            {transaction.type === 'buy' ? 'خرید' : 'فروش'} {formatNumber(transaction.amount)} TWIN
                          </p>
                          <p className="mt-1 truncate text-xs text-gray-500">
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
                        <p className="text-sm font-semibold text-gray-900">{formatPrice(transaction.price)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-12 text-center">
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
            <h3 className="mt-2 text-sm font-semibold text-gray-900">هنوز TWIN ندارید</h3>
            <p className="mt-1 text-sm text-gray-500">برای شروع معامله، به صفحه معامله بروید</p>
            <div className="mt-6">
              <Link
                href="/trade"
                className="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
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

