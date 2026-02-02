'use client'

import { useState } from 'react'
import TradeHeader from '@/components/trade/TradeHeader'
import MarketList from '@/components/trade/MarketList'
import RecentTrades from '@/components/trade/RecentTrades'
import OrderBook from '@/components/trade/OrderBook'
import TradeForm from '@/components/trade/TradeForm'
import ChartSection from '@/components/trade/ChartSection'
import SupportButton from '@/components/trade/SupportButton'

const CURRENT_PRICE = 12300002052
const PRICE_USDT = '78,757.31'

export default function TradePage() {
  const [viewMode, setViewMode] = useState('professional')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOrderSubmit = ({ orderType, orderSide, amount, price }) => {
    setError('')
    if (!amount || parseFloat(amount) <= 0) {
      setError('لطفا مقدار را وارد کنید')
      return
    }
    if ((orderType === 'limit' || orderType === 'stop_limit') && (!price || parseFloat(price) <= 0)) {
      setError('لطفا قیمت را وارد کنید')
      return
    }
    if (isNaN(parseFloat(amount))) {
      setError('فرمت عدد وارد شده صحیح نیست')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setError('')
    }, 1000)
  }

  return (
    <div dir="rtl" className="rtl flex min-h-full flex-col bg-slate-900">
      {/* هدر صفحه معامله */}
      <TradeHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        currentPrice={CURRENT_PRICE}
        priceUsdt={PRICE_USDT}
        pairSymbol="BTC/TMN"
        pairLabel="تومان / بیت کوین"
      />

      {/* محتوای اصلی */}
      <div className="flex-1 px-2 py-3 lg:px-4">
        {viewMode === 'professional' ? (
          <>
            {/* چیدمان سه پنل - حرفه‌ای */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-4">
              {/* پنل راست (RTL): لیست بازار + لیست معامله ها */}
              <aside className="order-2 flex flex-col lg:order-1 lg:col-span-3">
                <div className="glass-card rounded-xl p-3">
                  <MarketList />
                  <RecentTrades />
                </div>
              </aside>

              {/* پنل وسط: چارت */}
              <section className="order-1 lg:order-2 lg:col-span-6">
                <div className="glass-card rounded-xl p-3">
                  <ChartSection pairSymbol="BTC/TMN" interval="60" />
                </div>
              </section>

              {/* پنل چپ (RTL): دفتر سفارش + فرم */}
              <aside className="order-3 lg:col-span-3">
                <div className="glass-card rounded-xl p-3">
                  <OrderBook buyPercent={43} sellPercent={57} currentPrice={12320528801} />
                  <TradeForm
                    currentPrice={12320528801}
                    onSubmit={handleOrderSubmit}
                    loading={loading}
                    error={error}
                  />
                </div>
              </aside>
            </div>

            <SupportButton />
          </>
        ) : (
          /* حالت کلاسیک: چارت + دفتر سفارش + فرم به صورت عمودی */
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="glass-card rounded-xl p-4">
              <ChartSection pairSymbol="BTC/TMN" interval="60" />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="glass-card rounded-xl p-4">
                <OrderBook buyPercent={43} sellPercent={57} currentPrice={12320528801} />
              </div>
              <div className="glass-card rounded-xl p-4">
                <TradeForm
                  currentPrice={12320528801}
                  onSubmit={handleOrderSubmit}
                  loading={loading}
                  error={error}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
