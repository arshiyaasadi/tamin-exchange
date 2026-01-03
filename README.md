# صرافی TWIN

صرافی دیجیتال برای خرید و فروش ارز TWIN (ارز مبتنی بر نقره) با طراحی موبایل‌فرست، تم نقره‌ای و رنگ پرایمری بنفش پررنگ.

## ویژگی‌ها

- ✅ ورود با شماره موبایل و رمز عبور
- ✅ نمایش دارایی‌های کاربر (TWIN و معادل تومان)
- ✅ قیمت لحظه‌ای TWIN با چارت TradingView
- ✅ Order Book (دفتر سفارشات)
- ✅ ثبت سفارش خرید/فروش (Market و Limit)
- ✅ نمایش تراکنش‌های اخیر
- ✅ نوتیفیکیشن‌ها با Bottom Sheet
- ✅ پشتیبانی کامل از RTL (راست به چپ)
- ✅ طراحی موبایل‌فرست

## تکنولوژی‌ها

- **Next.js 14** - فریمورک React
- **Tailwind CSS** - استایل‌دهی
- **Headless UI** - کامپوننت‌های UI
- **Heroicons** - آیکون‌ها
- **TradingView Widget** - چارت قیمت

## نصب و راه‌اندازی

### پیش‌نیازها

- Node.js 18 یا بالاتر
- npm یا yarn

### نصب وابستگی‌ها

```bash
npm install
# یا
yarn install
```

### اجرای پروژه در حالت توسعه

```bash
npm run dev
# یا
yarn dev
```

پروژه در آدرس [http://localhost:3000](http://localhost:3000) در دسترس خواهد بود.

### ساخت برای تولید

```bash
npm run build
npm start
# یا
yarn build
yarn start
```

## ساختار پروژه

```
tamin-exchange/
├── src/
│   ├── app/                    # صفحات Next.js App Router
│   │   ├── login/              # صفحه ورود
│   │   ├── (main)/             # Layout اصلی با Bottom Navigation
│   │   │   ├── page.jsx        # صفحه Portfolio
│   │   │   ├── trade/          # صفحه معامله
│   │   │   └── profile/        # صفحه پروفایل
│   │   └── layout.jsx          # Root Layout
│   ├── components/             # کامپوننت‌های سفارشی
│   │   └── layout/             # کامپوننت‌های چیدمان
│   │       ├── BottomNavigation.jsx
│   │       ├── TopBar.jsx
│   │       └── NotificationDrawer.jsx
│   └── lib/                    # توابع کمکی
│       └── utils.js
├── ui-blocks/                   # کامپوننت‌های UI آماده (مرجع)
└── public/                      # فایل‌های استاتیک
```

## صفحات اصلی

### 1. ورود (`/login`)
- فرم ورود با شماره موبایل و رمز عبور
- لینک فراموشی رمز عبور
- اعتبارسنجی شماره موبایل

### 2. خانه / Portfolio (`/`)
- نمایش دارایی‌های کاربر
- قیمت لحظه‌ای TWIN
- تراکنش‌های اخیر
- Empty state برای کاربران بدون دارایی

### 3. معامله (`/trade`)
- چارت قیمت لحظه‌ای با TradingView Widget
- Order Book (خرید/فروش)
- فرم ثبت سفارش (Market/Limit)

### 4. پروفایل (`/profile`)
- نمایش شماره موبایل
- دکمه خروج

## تم و رنگ‌ها

- **Primary**: بنفش پررنگ (`purple-600`, `purple-700`)
- **Background**: تم نقره‌ای (`slate-50`, `slate-100`, `slate-200`)
- **Success**: سبز (`green-500`, `green-600`)
- **Error**: قرمز (`red-500`, `red-600`)

## RTL Support

پروژه به طور کامل از راست‌چین (RTL) پشتیبانی می‌کند:
- استفاده از Tailwind RTL plugin
- کلاس‌های منطقی (`ms-`, `me-`, `start-`, `end-`)
- تمام کامپوننت‌ها با `dir="rtl"` تنظیم شده‌اند

## مستندات

- [ui-blocks/README.md](ui-blocks/README.md) - راهنمای استفاده از کامپوننت‌های UI
- [agents.md](agents.md) - مستندات کامل پروژه برای AI agents

## توسعه

### قوانین کدنویسی

1. **RTL First**: همیشه RTL را در نظر بگیرید
2. **Mobile First**: طراحی برای موبایل (حداقل 360x800)
3. **رنگ‌ها**: از رنگ‌های تعریف شده در تم استفاده کنید
4. **نام‌گذاری**: فایل‌ها PascalCase، متغیرها camelCase

### افزودن کامپوننت جدید

1. کامپوننت را از `ui-blocks/` کپی کنید
2. به `src/components/ui/` منتقل کنید
3. فارسی‌سازی و RTL را اعمال کنید
4. رنگ‌ها را به purple و slate تغییر دهید

## TODO

- [ ] اتصال به API واقعی
- [ ] مدیریت State (Context یا Zustand)
- [ ] Authentication با JWT
- [ ] WebSocket برای قیمت‌های لحظه‌ای
- [ ] تست‌های واحد
- [ ] بهینه‌سازی عملکرد

## لایسنس

این پروژه برای استفاده داخلی است.

