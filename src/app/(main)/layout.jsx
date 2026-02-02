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
  // #region agent log
  if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7242/ingest/fa5c7cac-c895-4621-801d-ec8cb1014246',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'layout.jsx:10',message:'MainLayout client component rendering',data:{hasChildren:!!children,route:'/(main)/layout'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{}); }
  // #endregion

  const isTradePage = pathname === '/trade'

  useEffect(() => {
    // صفحه معامله بدون لاگین قابل مشاهده است
    if (isTradePage) {
      setIsChecking(false)
      return
    }
    // بررسی احراز هویت برای سایر صفحات
    if (!isAuthenticated()) {
      router.replace('/login')
    } else {
      setIsChecking(false)
    }
  }, [router, isTradePage])

  // نمایش loading در حین بررسی احراز هویت (صفحه معامله بدون لاگین نیازی به بررسی ندارد)
  if (isChecking && !isTradePage) {
    return (
      <div dir="rtl" className="flex min-h-screen flex-col items-center justify-center bg-slate-900 rtl">
        <div className="text-gray-400">در حال بررسی...</div>
      </div>
    )
  }

  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-slate-900 rtl">
      <TopBar />
      <main className="flex-1 pb-16 pt-16 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      <BottomNavigation />
    </div>
  )
}
