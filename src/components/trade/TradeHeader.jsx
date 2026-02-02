'use client'

import { formatNumber } from '@/lib/utils'
import { cn } from '@/lib/utils'

const MARKET_STATS = [
  { label: 'قیمت جهانی (USDT)', value: '78,757.31' },
  { label: 'قیمت شاخص (TMN)', value: '12,336,554,100' },
  { label: 'حجم معامله ۲۴ (TMN)', value: '138,560,576,328' },
  { label: 'حجم معامله ۲۴ (BTC)', value: '11.238' },
  { label: 'پایین ترین قیمت ۲۴', value: '12,000,000,009' },
  { label: 'بالاترین قیمت ۲۴', value: '12,662,144,190' },
  { label: 'تغییرات ۲۴', value: '-1.98%', negative: true },
]

export default function TradeHeader({
  viewMode,
  onViewModeChange,
  currentPrice = 12300002052,
  priceUsdt = '78,757.31',
  pairSymbol = 'BTC/TMN',
  pairLabel = 'تومان / بیت کوین',
}) {
  return (
    <header dir="rtl" className="rtl border-b border-slate-700/50 bg-slate-800/50 px-3 py-3 lg:px-4">
      <div className="flex flex-wrap items-center gap-3 lg:gap-4">
        {/* سوییچ حرفه‌ای / کلاسیک */}
        <div className="flex rounded-lg bg-slate-700/50 p-0.5">
          <button
            type="button"
            onClick={() => onViewModeChange('professional')}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              viewMode === 'professional'
                ? 'bg-primary-600 text-white'
                : 'text-slate-300 hover:text-white'
            )}
          >
            حرفه ای
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('classic')}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              viewMode === 'classic'
                ? 'bg-primary-600 text-white'
                : 'text-slate-300 hover:text-white'
            )}
          >
            کلاسیک
          </button>
        </div>

        {/* اطلاعات جفت ارز */}
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-slate-600">
            <span className="text-lg">₿</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-100">{pairSymbol}</div>
            <div className="text-xs text-slate-400">{pairLabel}</div>
          </div>
        </div>

        {/* قیمت فعلی و USDT */}
        <div className="ms-auto text-end">
          <div className="text-lg font-bold text-slate-100 lg:text-xl">
            {formatNumber(currentPrice)}
          </div>
          <div className="text-xs text-slate-400" dir="ltr">
            {priceUsdt} USDT
          </div>
        </div>

        {/* آمار بازار */}
        <div className="flex w-full flex-wrap gap-x-4 gap-y-1 overflow-x-auto lg:w-auto lg:flex-1 lg:justify-end">
          {MARKET_STATS.map((stat) => (
            <div key={stat.label} className="flex shrink-0 flex-col">
              <span className="text-xs text-slate-500">{stat.label}</span>
              <span
                className={cn(
                  'text-xs font-medium',
                  stat.negative ? 'text-red-400' : 'text-slate-300'
                )}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
