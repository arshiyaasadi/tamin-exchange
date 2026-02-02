import './globals.css'

export const metadata = {
  title: 'صرافی TWIN - خرید و فروش ارز دیجیتال',
  description: 'صرافی ارز دیجیتال TWIN - تجربه معاملاتی امن، سریع و حرفه‌ای برای خرید و فروش ارز TWIN',
}

export default function RootLayout({ children }) {
  // #region agent log
  if (typeof process !== 'undefined' && process.env) { const fs = require('fs'); const logPath = '/Users/arshiyaasadi/Projects/tamin-exchange/.cursor/debug.log'; try { fs.appendFileSync(logPath, JSON.stringify({location:'layout.jsx:9',message:'RootLayout server component rendering',data:{hasChildren:!!children,isServer:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'}) + '\n'); } catch(e) {} }
  // #endregion
  return (
    <html lang="fa" dir="rtl">
      <body className="rtl">{children}</body>
    </html>
  )
}

