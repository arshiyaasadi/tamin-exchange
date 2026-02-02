'use client'

import { usePathname } from 'next/navigation'
import MainLayout from './layout-main'

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/home'
  const isLoginPage = pathname === '/login'

  // برای صفحات home و login، layout اصلی را نمایش نده
  if (isHomePage || isLoginPage) {
    return <>{children}</>
  }

  // برای سایر صفحات، MainLayout را استفاده کن
  return <MainLayout>{children}</MainLayout>
}
