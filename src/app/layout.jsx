import './globals.css'

export const metadata = {
  title: 'صرافی TWIN',
  description: 'صرافی دیجیتال برای خرید و فروش ارز TWIN',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="rtl">{children}</body>
    </html>
  )
}

