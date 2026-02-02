'use client'

import { useState } from 'react'
import { formatNumber } from '@/lib/utils'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

const MARKET_TABS = [
  { id: 'tether', label: 'تتر' },
  { id: 'toman', label: 'تومان' },
  { id: 'all', label: 'همه' },
]

const TYPE_TABS = [
  { id: 'spot', label: 'اسپات' },
  { id: 'futures', label: 'تعهدی' },
]

const MOCK_MARKETS = [
  { symbol: 'XAUT/USDT', change24: -3.67, price: 4622.7 },
  { symbol: 'BTC/USDT', change24: 1.65, price: 78757.31 },
  { symbol: 'ETH/USDT', change24: -0.82, price: 3456.12 },
  { symbol: 'BTC/TMN', change24: -1.98, price: 12300002052 },
  { symbol: 'ETH/TMN', change24: 0.45, price: 4321000000 },
]

export default function MarketList() {
  const [marketTab, setMarketTab] = useState('tether')
  const [typeTab, setTypeTab] = useState('spot')
  const [search, setSearch] = useState('')

  return (
    <div dir="rtl" className="rtl flex flex-col">
      {/* جستجو */}
      <div className="relative mb-3">
        <MagnifyingGlassIcon className="absolute end-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجوی بازار..."
          className="w-full rounded-lg border border-slate-600 bg-slate-800/80 pe-9 ps-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>

      {/* تب نوع: اسپات / تعهدی */}
      <div className="mb-2 flex gap-1">
        {TYPE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setTypeTab(tab.id)}
            className={cn(
              'rounded px-2 py-1 text-xs font-medium',
              typeTab === tab.id
                ? 'bg-primary-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* تب بازار: تتر / تومان / همه */}
      <div className="mb-3 flex gap-1">
        {MARKET_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMarketTab(tab.id)}
            className={cn(
              'rounded px-2 py-1 text-xs font-medium',
              marketTab === tab.id
                ? 'bg-slate-600 text-slate-100'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* جدول لیست بازار */}
      <div className="overflow-x-auto rounded-lg border border-slate-600 bg-slate-800/50">
        <table className="w-full min-w-[200px] text-sm">
          <thead>
            <tr className="border-b border-slate-600 text-slate-400">
              <th className="py-2 pe-2 text-end text-xs font-medium">تغییر ۲۴</th>
              <th className="py-2 pe-2 text-end text-xs font-medium">قیمت واحد</th>
              <th className="py-2 pe-2 text-end text-xs font-medium">بازار</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_MARKETS.map((row) => (
              <tr
                key={row.symbol}
                className="border-b border-slate-700/50 last:border-0 hover:bg-slate-700/30"
              >
                <td
                  className={cn(
                    'py-1.5 pe-2 text-end font-medium',
                    row.change24 >= 0 ? 'text-green-400' : 'text-red-400'
                  )}
                >
                  {row.change24 >= 0 ? '+' : ''}
                  {row.change24}%
                </td>
                <td className="py-1.5 pe-2 text-end text-slate-300">
                  {formatNumber(row.price)}
                </td>
                <td className="py-1.5 pe-2 text-end text-slate-200">{row.symbol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
