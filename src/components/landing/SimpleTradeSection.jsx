'use client'

import Link from 'next/link'
import Image from 'next/image'

const coins = [
  { name: 'TWIN', persianName: 'TWIN', href: '/trade', image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png' },
  { name: 'BTC', persianName: 'بیت کوین', href: '#', image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png' },
  { name: 'USDT', persianName: 'تتر', href: '#', image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png' },
  { name: 'ETH', persianName: 'اتریوم', href: '#', image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png' },
  { name: 'SOL', persianName: 'سولانا', href: '#', image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png' },
  { name: 'BNB', persianName: 'بایننس کوین', href: '#', image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png' },
  { name: 'DOGE', persianName: 'دوج کوین', href: '#', image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png' },
  { name: 'XRP', persianName: 'ریپل', href: '#', image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png' },
  { name: 'ADA', persianName: 'کاردانو', href: '#', image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png' },
  { name: 'TRX', persianName: 'ترون', href: '#', image: 'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png' },
]

export default function SimpleTradeSection() {
  return (
    <div dir="rtl" className="rtl bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">خرید و فروش آنی رمزارزها</h2>
              <p className="text-gray-400 text-sm">معامله سریع و آسان با بهترین نرخ‌ها</p>
            </div>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-all duration-200 hover:gap-3"
            >
              <span>مشاهده همه</span>
              <span aria-hidden="true">←</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
            {coins.map((coin) => (
              <Link
                key={coin.name}
                href={coin.href}
                className="group relative flex flex-col items-center gap-3 p-4 rounded-xl glass hover:glass-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/20 border border-white/5 hover:border-primary-500/30"
              >
                <div className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-600/20 to-primary-500/20 group-hover:from-primary-600/30 group-hover:to-primary-500/30 transition-all duration-300 ring-2 ring-primary-500/0 group-hover:ring-primary-500/30">
                  <Image
                    src={coin.image}
                    alt={coin.persianName}
                    width={32}
                    height={32}
                    className="rounded-full"
                    unoptimized
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-600/0 to-primary-500/0 group-hover:from-primary-600/20 group-hover:to-primary-500/20 transition-all duration-300" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-white group-hover:text-primary-300 transition-colors">
                    {coin.persianName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-mono">{coin.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
