'use client'

import { useState } from 'react'
import { formatNumber, formatPrice } from '@/lib/utils'
import Script from 'next/script'

// Mock data
const orderBook = {
  buys: [
    { price: 10050, amount: 150 },
    { price: 10000, amount: 200 },
    { price: 9950, amount: 100 },
  ],
  sells: [
    { price: 10100, amount: 120 },
    { price: 10150, amount: 180 },
    { price: 10200, amount: 250 },
  ],
}

export default function TradePage() {
  const [orderType, setOrderType] = useState('market') // 'market' or 'limit'
  const [orderSide, setOrderSide] = useState('buy') // 'buy' or 'sell'
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!amount || parseFloat(amount) <= 0) {
      setError('لطفا مقدار را وارد کنید')
      return
    }

    if (orderType === 'limit' && (!price || parseFloat(price) <= 0)) {
      setError('لطفا قیمت را وارد کنید')
      return
    }

    if (isNaN(parseFloat(amount))) {
      setError('فرمت عدد وارد شده صحیح نیست')
      return
    }

    setLoading(true)
    // TODO: API call
    setTimeout(() => {
      setLoading(false)
      alert('سفارش ثبت شد')
      setAmount('')
      setPrice('')
    }, 1000)
  }

  return (
    <div dir="rtl" className="rtl">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">معامله</h2>

        {/* TradingView Widget */}
        <div className="mt-6">
          <div className="h-96 rounded-xl glass-card p-4">
            <Script
              src="https://s3.tradingview.com/tv.js"
              strategy="afterInteractive"
              onLoad={() => {
                if (typeof window !== 'undefined' && window.TradingView) {
                  new window.TradingView.widget({
                    autosize: true,
                    symbol: 'BINANCE:BTCUSDT',
                    interval: 'D',
                    timezone: 'Asia/Tehran',
                    theme: 'dark',
                    style: '1',
                    locale: 'fa_IR',
                    toolbar_bg: 'rgba(15, 23, 42, 0.8)',
                    enable_publishing: false,
                    hide_top_toolbar: false,
                    hide_legend: false,
                    save_image: false,
                    container_id: 'tradingview_widget',
                  })
                }
              }}
            />
            <div id="tradingview_widget" className="h-full w-full" />
          </div>
        </div>

        {/* Order Book */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="glass-card rounded-xl p-4">
            <h3 className="text-sm font-semibold text-buy-DEFAULT mb-4">خرید</h3>
            <div className="mt-4 space-y-3">
              {orderBook.buys.map((order, index) => (
                <div key={index} className="flex items-center justify-between text-sm py-2">
                  <span className="text-buy-DEFAULT font-semibold">{formatPrice(order.price)}</span>
                  <span className="text-gray-300">{formatNumber(order.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl p-4">
            <h3 className="text-sm font-semibold text-sell-DEFAULT mb-4">فروش</h3>
            <div className="mt-4 space-y-3">
              {orderBook.sells.map((order, index) => (
                <div key={index} className="flex items-center justify-between text-sm py-2">
                  <span className="text-sell-DEFAULT font-semibold">{formatPrice(order.price)}</span>
                  <span className="text-gray-300">{formatNumber(order.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="mt-6 glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-6">ثبت سفارش</h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Order Type */}
            <div>
              <label className="text-sm font-semibold text-gray-200 mb-3 block">نوع سفارش</label>
              <div className="mt-2 space-y-3">
                <div className="flex items-center">
                  <input
                    id="market"
                    name="order-type"
                    type="radio"
                    checked={orderType === 'market'}
                    onChange={() => setOrderType('market')}
                    className="relative size-4 appearance-none rounded-full border-2 border-gray-500 glass-input before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-purple-400 checked:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400/50"
                  />
                  <label htmlFor="market" className="ms-3 block text-sm font-medium text-gray-300">
                    Market
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="limit"
                    name="order-type"
                    type="radio"
                    checked={orderType === 'limit'}
                    onChange={() => setOrderType('limit')}
                    className="relative size-4 appearance-none rounded-full border-2 border-gray-500 glass-input before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-purple-400 checked:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400/50"
                  />
                  <label htmlFor="limit" className="ms-3 block text-sm font-medium text-gray-300">
                    Limit
                  </label>
                </div>
              </div>
            </div>

            {/* Order Side */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderSide('buy')}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  orderSide === 'buy'
                    ? 'bg-buy-DEFAULT text-white shadow-lg shadow-buy-DEFAULT/20'
                    : 'glass-light text-gray-300 hover:bg-white/10'
                }`}
              >
                خرید
              </button>
              <button
                type="button"
                onClick={() => setOrderSide('sell')}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  orderSide === 'sell'
                    ? 'bg-sell-DEFAULT text-white shadow-lg shadow-sell-DEFAULT/20'
                    : 'glass-light text-gray-300 hover:bg-white/10'
                }`}
              >
                فروش
              </button>
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-200 mb-2">
                مقدار (TWIN)
              </label>
              <div className="mt-2">
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="glass-input block w-full rounded-xl px-4 py-3 text-base text-gray-100 placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Price (only for Limit) */}
            {orderType === 'limit' && (
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-200 mb-2">
                  قیمت (تومان)
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    name="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="glass-input block w-full rounded-xl px-4 py-3 text-base text-gray-100 placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    placeholder="0"
                  />
                </div>
              </div>
            )}

            {/* Fee */}
            <div className="glass-light rounded-xl p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">کارمزد</span>
                <span className="font-semibold text-gray-200">0.1%</span>
              </div>
            </div>

            {error && (
              <div className="glass-light rounded-xl p-4 border border-red-400/30">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                orderSide === 'buy'
                  ? 'bg-buy-DEFAULT hover:bg-buy-light focus-visible:outline-buy-DEFAULT shadow-buy-DEFAULT/30'
                  : 'bg-sell-DEFAULT hover:bg-sell-light focus-visible:outline-sell-DEFAULT shadow-sell-DEFAULT/30'
              }`}
            >
              {loading ? 'در حال ثبت...' : orderSide === 'buy' ? 'خرید' : 'فروش'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

