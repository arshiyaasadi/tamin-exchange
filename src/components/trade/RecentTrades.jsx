'use client'

import { formatNumber } from '@/lib/utils'

const MOCK_TRADES = [
  { time: '19:35:19', amountBtc: 0.000025, priceTmn: 12300002052 },
  { time: '19:35:17', amountBtc: 0.000025, priceTmn: 12301000100 },
  { time: '19:35:14', amountBtc: 0.00005, priceTmn: 12300500000 },
  { time: '19:35:10', amountBtc: 0.0001, priceTmn: 12298000000 },
  { time: '19:35:05', amountBtc: 0.00002, priceTmn: 12302000000 },
]

export default function RecentTrades() {
  return (
    <div dir="rtl" className="rtl mt-4">
      <h3 className="mb-2 text-sm font-semibold text-slate-200">لیست معامله ها</h3>
      <div className="overflow-x-auto rounded-lg border border-slate-600 bg-slate-800/50">
        <table className="w-full min-w-[180px] text-sm">
          <thead>
            <tr className="border-b border-slate-600 text-slate-400">
              <th className="py-2 pe-2 text-end text-xs font-medium">زمان</th>
              <th className="py-2 pe-2 text-end text-xs font-medium">مقدار BTC</th>
              <th className="py-2 pe-2 text-end text-xs font-medium">قیمت TMN</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_TRADES.map((trade, i) => (
              <tr
                key={i}
                className="border-b border-slate-700/50 last:border-0 hover:bg-slate-700/30"
              >
                <td className="py-1.5 pe-2 text-end text-slate-300">{trade.time}</td>
                <td className="py-1.5 pe-2 text-end text-slate-300">{trade.amountBtc}</td>
                <td className="py-1.5 pe-2 text-end text-slate-200">
                  {formatNumber(trade.priceTmn)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
