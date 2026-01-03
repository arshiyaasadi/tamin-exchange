'use client'

import BottomNavigation from '@/components/layout/BottomNavigation'
import TopBar from '@/components/layout/TopBar'

export default function MainLayout({ children }) {
  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-slate-900 rtl">
      <TopBar />
      <main className="flex-1 pb-16 pt-16 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      <BottomNavigation />
    </div>
  )
}
