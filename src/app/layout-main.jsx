'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import BottomNavigation from '@/components/layout/BottomNavigation'
import TopBar from '@/components/layout/TopBar'
import { isAuthenticated } from '@/lib/utils'

export default function MainLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  const isTradePage = pathname === '/trade'
  const isHomePage = pathname === '/home'

  useEffect(() => {
    // صفحه معامله و home بدون لاگین قابل مشاهده است
    if (isTradePage || isHomePage) {
      setIsChecking(false)
      return
    }
    // بررسی احراز هویت برای سایر صفحات
    if (!isAuthenticated()) {
      router.replace('/login')
    } else {
      setIsChecking(false)
    }
  }, [router, isTradePage, isHomePage])

  // نمایش loading در حین بررسی احراز هویت (صفحه معامله و home بدون لاگین نیازی به بررسی ندارد)
  if (isChecking && !isTradePage && !isHomePage) {
    return (
      <div dir="rtl" className="flex min-h-screen flex-col items-center justify-center bg-slate-900 rtl">
        <div className="text-gray-400">در حال بررسی...</div>
      </div>
    )
  }

  // برای صفحه home، layout را نمایش نده
  if (isHomePage) {
    return <>{children}</>
  }

  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-slate-900 rtl">
      <TopBar />
      <main className="flex-1 pb-16 pt-16 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      <BottomNavigation />
    </div>
  )
}
