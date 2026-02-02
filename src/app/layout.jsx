import './globals.css'
import LayoutWrapper from './layout-wrapper'

export const metadata = {
  title: 'صرافی TWIN - خرید و فروش ارز دیجیتال',
  description: 'صرافی ارز دیجیتال TWIN - تجربه معاملاتی امن، سریع و حرفه‌ای برای خرید و فروش ارز TWIN',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="rtl">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}

