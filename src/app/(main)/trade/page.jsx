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
    <div dir="rtl" className="px-4 py-6 sm:px-6 lg:px-8 rtl">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-900">معامله</h2>

        {/* TradingView Widget */}
        <div className="mt-6">
          <div className="h-96 rounded-lg bg-white p-4 shadow-sm">
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
                    theme: 'light',
                    style: '1',
                    locale: 'fa_IR',
                    toolbar_bg: '#f1f3f6',
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
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900">خرید</h3>
            <div className="mt-4">
              <div className="space-y-2">
                {orderBook.buys.map((order, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-medium">{formatPrice(order.price)}</span>
                    <span className="text-gray-700">{formatNumber(order.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900">فروش</h3>
            <div className="mt-4">
              <div className="space-y-2">
                {orderBook.sells.map((order, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-red-600 font-medium">{formatPrice(order.price)}</span>
                    <span className="text-gray-700">{formatNumber(order.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">ثبت سفارش</h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Order Type */}
            <div>
              <label className="text-sm font-semibold text-gray-900">نوع سفارش</label>
              <div className="mt-2 space-y-3">
                <div className="flex items-center">
                  <input
                    id="market"
                    name="order-type"
                    type="radio"
                    checked={orderType === 'market'}
                    onChange={() => setOrderType('market')}
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-purple-600 checked:bg-purple-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                  />
                  <label htmlFor="market" className="ms-3 block text-sm font-medium text-gray-900">
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
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-purple-600 checked:bg-purple-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                  />
                  <label htmlFor="limit" className="ms-3 block text-sm font-medium text-gray-900">
                    Limit
                  </label>
                </div>
              </div>
            </div>

            {/* Order Side */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setOrderSide('buy')}
                className={`rounded-md px-4 py-3 text-sm font-semibold transition-colors ${
                  orderSide === 'buy'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                خرید
              </button>
              <button
                type="button"
                onClick={() => setOrderSide('sell')}
                className={`rounded-md px-4 py-3 text-sm font-semibold transition-colors ${
                  orderSide === 'sell'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                فروش
              </button>
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-900">
                مقدار (TWIN)
              </label>
              <div className="mt-2">
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-600 sm:text-sm/6"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Price (only for Limit) */}
            {orderType === 'limit' && (
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-900">
                  قیمت (تومان)
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    name="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-600 sm:text-sm/6"
                    placeholder="0"
                  />
                </div>
              </div>
            )}

            {/* Fee */}
            <div className="rounded-md bg-slate-50 p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">کارمزد</span>
                <span className="font-medium text-gray-900">0.1%</span>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-md px-4 py-3 text-sm font-semibold text-white shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-50 ${
                orderSide === 'buy'
                  ? 'bg-green-600 hover:bg-green-500 focus-visible:outline-green-600'
                  : 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600'
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

