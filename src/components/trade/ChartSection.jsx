'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { formatNumber } from '@/lib/utils'
import { config } from '@/lib/config'
import { cn } from '@/lib/utils'

const TIMEFRAMES = [
  { id: '60', label: '1h' },
  { id: 'D', label: '1d' },
  { id: 'W', label: '1w' },
]

function getChartOptions() {
  return [
    { id: 'exchange', label: config.getChartOptionLabel() },
    { id: 'depth', label: 'نمودار عمق بازار' },
    { id: 'global', label: 'نمودار جهانی' },
  ]
}

const MOCK_OHLC = {
  open: 12314618407,
  high: 12326439194,
  low: 12300002052,
  close: 12300002052,
}

function createTradingViewWidget(interval) {
  const container = document.getElementById('tradingview_trade_widget')
  if (!container || typeof window === 'undefined' || !window.TradingView) return
  container.innerHTML = ''
  new window.TradingView.widget({
    autosize: true,
    symbol: 'BINANCE:BTCUSDT',
    interval: interval === '60' ? '60' : interval === 'D' ? 'D' : 'W',
    timezone: 'Asia/Tehran',
    theme: 'dark',
    style: '1',
    locale: 'fa_IR',
    toolbar_bg: 'rgba(15, 23, 42, 0.8)',
    enable_publishing: false,
    hide_top_toolbar: false,
    hide_legend: false,
    save_image: false,
    container_id: 'tradingview_trade_widget',
  })
}

export default function ChartSection({
  pairSymbol = 'BTC/TMN',
  interval = '60',
  onIntervalChange,
}) {
  const [timeframe, setTimeframe] = useState(interval)
  const [chartOption, setChartOption] = useState('exchange')
  const scriptLoaded = useRef(false)
  const chartOptions = getChartOptions()

  useEffect(() => {
    if (scriptLoaded.current) {
      createTradingViewWidget(timeframe)
    }
  }, [timeframe])

  const handleLoad = () => {
    scriptLoaded.current = true
    createTradingViewWidget(timeframe)
  }

  return (
    <div dir="rtl" className="rtl flex flex-col">
      <Script
        src="https://s3.tradingview.com/tv.js"
        strategy="afterInteractive"
        onLoad={handleLoad}
      />

      {/* هدر چارت */}
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm font-semibold text-slate-200">
          {pairSymbol} - {TIMEFRAMES.find((t) => t.id === timeframe)?.label || '1h'} - {config.appName}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>O {formatNumber(MOCK_OHLC.open)}</span>
          <span>H {formatNumber(MOCK_OHLC.high)}</span>
          <span>L {formatNumber(MOCK_OHLC.low)}</span>
          <span>C {formatNumber(MOCK_OHLC.close)}</span>
        </div>
      </div>

      {/* انتخاب تایم‌فریم */}
      <div className="mb-2 flex gap-1">
        {TIMEFRAMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTimeframe(t.id)
              onIntervalChange?.(t.id)
            }}
            className={cn(
              'rounded px-2 py-1 text-xs font-medium',
              timeframe === t.id
                ? 'bg-primary-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* انتخاب نوع نمودار */}
      <div className="mb-2 flex flex-wrap gap-1">
        {chartOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setChartOption(opt.id)}
            className={cn(
              'rounded px-2 py-1 text-xs',
              chartOption === opt.id
                ? 'bg-slate-600 text-slate-100'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ویجت TradingView */}
      <div className="min-h-[320px] rounded-lg border border-slate-600 bg-slate-800/50 p-2 lg:min-h-[400px]">
        <div id="tradingview_trade_widget" className="h-full w-full min-h-[300px]" />
      </div>

      {/* زمان فعلی */}
      <div className="mt-2 text-end text-xs text-slate-500">
        {new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}{' '}
        (UTC+3:30)
      </div>
    </div>
  )
}
