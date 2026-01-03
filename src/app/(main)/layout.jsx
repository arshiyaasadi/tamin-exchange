'use client'

import BottomNavigation from '@/components/layout/BottomNavigation'
import TopBar from '@/components/layout/TopBar'

export default function MainLayout({ children }) {
  // #region agent log
  if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7242/ingest/fa5c7cac-c895-4621-801d-ec8cb1014246',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'layout.jsx:7',message:'MainLayout client component rendering',data:{hasChildren:!!children,route:'/(main)/layout'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{}); }
  // #endregion
  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-slate-900 rtl">
      <TopBar />
      <main className="flex-1 pb-16 pt-16 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      <BottomNavigation />
    </div>
  )
}
