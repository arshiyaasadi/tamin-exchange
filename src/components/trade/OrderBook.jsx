'use client'

import { formatNumber } from '@/lib/utils'
import { cn } from '@/lib/utils'

const MOCK_ORDER_BOOK = {
  sells: [
    { price: 12320528801, amount: 0.001, total: 12320528 },
    { price: 12320000000, amount: 0.002, total: 24640000 },
    { price: 12319500000, amount: 0.0005, total: 6159750 },
  ],
  buys: [
    { price: 12319000000, amount: 0.0015, total: 18478500 },
    { price: 12318500000, amount: 0.002, total: 24637000 },
    { price: 12318000000, amount: 0.001, total: 12318000 },
  ],
}

export default function OrderBook({ buyPercent = 43, sellPercent = 57, currentPrice = 12320528801 }) {
  return (
    <div dir="rtl" className="rtl flex flex-col">
      {/* نوار نسبت خرید/فروش */}
      <div className="mb-3">
        <div className="relative flex h-6 w-full overflow-hidden rounded-lg bg-slate-700">
          <div
            className="bg-green-500/70 transition-all"
            style={{ width: `${buyPercent}%` }}
          />
          <div
            className="bg-red-500/70 transition-all"
            style={{ width: `${sellPercent}%` }}
          />
          <div
            className="absolute top-0 h-full w-0.5 bg-slate-200 shadow-md"
            style={{ right: `${sellPercent}%` }}
            title="قیمت فعلی"
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-slate-400">
          <span className="text-green-400">۴۳% خرید</span>
          <span className="text-red-400">۵۷% فروش</span>
        </div>
      </div>

      {/* جدول دفتر سفارش */}
      <div className="overflow-x-auto rounded-lg border border-slate-600 bg-slate-800/50">
        <table className="w-full min-w-[220px] text-sm">
          <thead>
            <tr className="border-b border-slate-600 text-slate-400">
              <th className="py-2 pe-2 text-end text-xs font-medium">قیمت (TMN)</th>
              <th className="py-2 pe-2 text-end text-xs font-medium">مقدار (BTC)</th>
              <th className="py-2 pe-2 text-end text-xs font-medium">قیمت کل (TMN)</th>
            </tr>
          </thead>
          <tbody>
            {[...MOCK_ORDER_BOOK.sells].reverse().map((order, i) => (
              <tr
                key={`s-${i}`}
                className="border-b border-slate-700/50 bg-red-500/5 hover:bg-red-500/10"
              >
                <td className="py-1.5 pe-2 text-end font-medium text-red-400">
                  {formatNumber(order.price)}
                </td>
                <td className="py-1.5 pe-2 text-end text-slate-300">{order.amount}</td>
                <td className="py-1.5 pe-2 text-end text-slate-300">
                  {formatNumber(order.total)}
                </td>
              </tr>
            ))}
            <tr className="bg-slate-700/50">
              <td colSpan={3} className="py-1.5 pe-2 text-center text-xs font-semibold text-slate-200">
                {formatNumber(currentPrice)}
              </td>
            </tr>
            {MOCK_ORDER_BOOK.buys.map((order, i) => (
              <tr
                key={`b-${i}`}
                className={cn(
                  'border-b border-slate-700/50 last:border-0 bg-green-500/5 hover:bg-green-500/10'
                )}
              >
                <td className="py-1.5 pe-2 text-end font-medium text-green-400">
                  {formatNumber(order.price)}
                </td>
                <td className="py-1.5 pe-2 text-end text-slate-300">{order.amount}</td>
                <td className="py-1.5 pe-2 text-end text-slate-300">
                  {formatNumber(order.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
