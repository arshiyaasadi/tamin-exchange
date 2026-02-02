'use client'

import { useState } from 'react'
import { formatNumber, normalizeNumericInput } from '@/lib/utils'
import { cn } from '@/lib/utils'

const ORDER_TYPE_TABS = [
  { id: 'market', label: 'قیمت بازار' },
  { id: 'limit', label: 'قیمت ثابت' },
  { id: 'stop_market', label: 'حد ضرر با قیمت بازار' },
  { id: 'stop_limit', label: 'حد ضرر' },
]

export default function TradeForm({
  currentPrice = 12320528801,
  onSubmit,
  loading = false,
  error = '',
}) {
  const [orderType, setOrderType] = useState('market')
  const [orderSide, setOrderSide] = useState('buy')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const side = e.nativeEvent?.submitter?.value === 'sell' ? 'sell' : 'buy'
    if (onSubmit) {
      onSubmit({ orderType, orderSide: side, amount, price })
    } else {
      if (!amount || parseFloat(amount) <= 0) {
        return
      }
      if (orderType === 'limit' && (!price || parseFloat(price) <= 0)) {
        return
      }
      alert('سفارش ثبت شد')
      setAmount('')
      setPrice('')
    }
  }

  const handleBuyClick = () => setOrderSide('buy')
  const handleSellClick = () => setOrderSide('sell')

  const showPriceField = orderType === 'limit' || orderType === 'stop_limit'

  return (
    <div dir="rtl" className="rtl mt-4">
      {/* تب‌های نوع سفارش */}
      <div className="mb-3 flex flex-wrap gap-1">
        {ORDER_TYPE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setOrderType(tab.id)}
            className={cn(
              'rounded px-2 py-1 text-xs font-medium',
              orderType === tab.id
                ? 'bg-primary-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* نمایش قیمت فعلی */}
      <div className="mb-3 rounded-lg bg-slate-700/50 px-3 py-2 text-center">
        <span className="text-sm font-bold text-slate-100">{formatNumber(currentPrice)}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* مقدار */}
        <div>
          <label htmlFor="trade-amount" className="mb-1 block text-xs font-medium text-slate-400">
            مقدار (BTC)
          </label>
          <input
            id="trade-amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(normalizeNumericInput(e.target.value, true))}
            placeholder="0.00"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>

        {/* قیمت (برای Limit / حد ضرر) */}
        {showPriceField && (
          <div>
            <label htmlFor="trade-price" className="mb-1 block text-xs font-medium text-slate-400">
              قیمت (تومان)
            </label>
            <input
              id="trade-price"
              type="text"
              value={price}
              onChange={(e) => setPrice(normalizeNumericInput(e.target.value, true))}
              placeholder="0"
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        )}

        {/* کارمزد */}
        <div className="flex items-center justify-between rounded-lg bg-slate-700/30 px-3 py-2 text-xs">
          <span className="text-slate-400">کارمزد</span>
          <span className="font-medium text-slate-200">0.1%</span>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            {error}
          </div>
        )}

        {/* دکمه‌های خرید / فروش */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="submit"
            name="side"
            value="buy"
            disabled={loading}
            onClick={handleBuyClick}
            className="rounded-lg bg-green-600 px-3 py-2.5 text-sm font-bold text-white transition-colors hover:bg-green-500 disabled:opacity-50"
          >
            {loading ? '...' : 'خرید'}
          </button>
          <button
            type="submit"
            name="side"
            value="sell"
            disabled={loading}
            onClick={handleSellClick}
            className="rounded-lg bg-red-600 px-3 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-500 disabled:opacity-50"
          >
            {loading ? '...' : 'فروش'}
          </button>
        </div>
      </form>
    </div>
  )
}
