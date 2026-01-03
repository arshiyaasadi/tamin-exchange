# مستندات پروژه صرافی TWIN برای AI Agents

این فایل شامل جزئیات کامل پروژه صرافی تک‌ارز TWIN برای استفاده توسط AI agents در توسعه و نگهداری پروژه است.

## خلاصه پروژه

**نام پروژه**: صرافی TWIN  
**نوع**: صرافی دیجیتال برای خرید و فروش ارز TWIN (ارز مبتنی بر نقره)  
**هدف**: تجربه کاربری ساده و موبایل‌فرست با عملکرد سریع و قابل اعتماد  
**زبان**: فارسی (RTL - راست به چپ)  
**تم**: نقره‌ای با رنگ پرایمری بنفش پررنگ

## مشخصات فنی

- **فریمورک**: Next.js (App Router)
- **استایل**: Tailwind CSS با پلاگین RTL
- **کتابخانه UI**: Headless UI
- **چارت**: TradingView Widget
- **UI Components**: استفاده از کامپوننت‌های آماده از `/ui-blocks`
- **زبان**: فارسی (RTL)
- **حداقل سایز صفحه**: 360x800 (موبایل)

## ساختار پروژه

```
tamin-exchange/
├── ui-blocks/                    # کامپوننت‌های UI آماده (نمونه)
│   ├── application-ui/           # کامپوننت‌های اپلیکیشن
│   ├── ecommerce/                # کامپوننت‌های تجارت الکترونیک
│   └── marketing/                 # کامپوننت‌های مارکتینگ
├── src/
│   ├── app/                      # صفحات Next.js App Router
│   │   ├── login/                # صفحه ورود
│   │   ├── (main)/               # Layout اصلی با Bottom Navigation
│   │   │   ├── page.jsx          # صفحه Portfolio
│   │   │   ├── trade/             # صفحه معامله
│   │   │   └── profile/           # صفحه پروفایل
│   │   └── layout.jsx             # Root Layout
│   ├── components/               # کامپوننت‌های سفارشی
│   │   ├── ui/                   # کامپوننت‌های UI (کپی شده از ui-blocks)
│   │   ├── layout/               # کامپوننت‌های چیدمان
│   │   │   ├── BottomNavigation.jsx
│   │   │   └── TopBar.jsx
│   │   └── features/              # کامپوننت‌های ویژگی‌ها
│   ├── lib/                      # توابع کمکی
│   │   ├── utils.js              # توابع عمومی
│   │   └── api.js                # توابع API
│   └── styles/                   # استایل‌های سفارشی
│       └── globals.css            # استایل‌های全局
└── public/                        # فایل‌های استاتیک
```

## صفحات اصلی و فلوهای کاربر

### 1. صفحه ورود / ثبت‌نام (`/login`)

**مسیر**: `src/app/login/page.jsx`

**ویژگی‌ها:**
- ورود با شماره موبایل (11 رقم)
- ورود با رمز عبور
- لینک "فراموشی رمز عبور" که به صفحه بازیابی رمز هدایت می‌کند
- اعتبارسنجی شماره موبایل (فرمت صحیح)
- نمایش پیام خطا در صورت شماره موبایل یا رمز عبور اشتباه
- در صورت ثبت‌نام نکردن کاربر، مسیر ثبت‌نام نیست، فقط ورود انجام می‌شود

**کامپوننت‌های استفاده شده از ui-blocks:**
- `application-ui/forms/sign-in-forms/simple.jsx` - فرم ورود پایه
- `application-ui/forms/input-groups/input_with_label.jsx` - فیلد شماره موبایل
- `application-ui/forms/input-groups/input_with_validation_error.jsx` - نمایش خطا

**پیام‌های UI:**
- "ورود / ادامه با شماره موبایل"
- "شماره موبایل"
- "رمز عبور"
- "فراموشی رمز عبور"
- "شماره موبایل وارد شده صحیح نیست"
- "رمز عبور اشتباه است"

### 2. صفحه اصلی با Bottom Navigation

صفحه اصلی شامل سه بخش است که از طریق Bottom Navigation قابل دسترسی است:

#### 2.1 خانه / Portfolio (`/`)

**مسیر**: `src/app/(main)/page.jsx`

**ویژگی‌ها:**
- نمایش دارایی‌های کاربر:
  - مقدار TWIN
  - معادل آن به تومان
- نمایش قیمت لحظه‌ای TWIN با تغییرات (مثبت/منفی با رنگ سبز/قرمز)
- نمایش تراکنش‌های اخیر (حداقل ۳ تراکنش):
  - نوع تراکنش (خرید/فروش)
  - مقدار
  - تاریخ و زمان
- Empty State: در صورتی که کاربر دارایی نداشته باشد، نمایش پیام «هنوز TWIN ندارید» با CTA برای هدایت به صفحه معامله

**کامپوننت‌های استفاده شده:**
- `application-ui/data-display/stats/simple_in_cards.jsx` - نمایش دارایی‌ها
- `application-ui/lists/stacked-lists/simple.jsx` - لیست تراکنش‌های اخیر
- `application-ui/feedback/empty-states/simple.jsx` - حالت خالی (بدون TWIN)
- `application-ui/layout/cards/basic_card.jsx` - کارت‌های دارایی

**پیام‌های UI:**
- "دارایی شما"
- "مقدار TWIN"
- "معادل تومان"
- "قیمت لحظه‌ای TWIN"
- "تراکنش‌های اخیر"
- "هنوز TWIN ندارید"
- "شروع معامله" (CTA)

#### 2.2 معامله / Trade (`/trade`)

**مسیر**: `src/app/(main)/trade/page.jsx`

**ویژگی‌ها:**
- **چارت قیمت لحظه‌ای TWIN:**
  - استفاده از TradingView Widget
  - قابلیت زوم و اسکرول
  - نمایش قیمت در زمان واقعی
- **Order Book (دفتر سفارشات):**
  - نمایش سفارشات خرید (سبز)
  - نمایش سفارشات فروش (قرمز)
  - نمایش قیمت و مقدار هر سفارش
- **فرم ثبت سفارش خرید/فروش:**
  - انتخاب نوع سفارش: Market یا Limit
    - **Market**: خرید یا فروش بدون وارد کردن قیمت، فقط مقدار وارد می‌شود
    - **Limit**: خرید یا فروش با وارد کردن قیمت دلخواه به تومان
  - فیلد مقدار (TWIN)
  - فیلد قیمت (فقط برای Limit)
  - نمایش کارمزد (در صورت وجود)
  - دکمه‌های "خرید" و "فروش" با رنگ‌های متفاوت
- **اعتبارسنجی:**
  - بررسی موجودی کافی برای فروش
  - بررسی فرمت صحیح عدد
  - نمایش پیام خطا در صورت نیاز

**کامپوننت‌های استفاده شده:**
- TradingView Widget برای چارت
- `application-ui/lists/tables/simple.jsx` - Order Book
- `application-ui/forms/form-layouts/two_column.jsx` - فرم سفارش
- `application-ui/forms/radio-groups/simple_list.jsx` - انتخاب Market/Limit
- `application-ui/forms/input-groups/input_with_label.jsx` - فیلدهای فرم
- `application-ui/feedback/alerts/` - پیام‌های خطا

**پیام‌های UI:**
- "نوع سفارش"
- "Market"
- "Limit"
- "مقدار (TWIN)"
- "قیمت (تومان)"
- "کارمزد"
- "خرید"
- "فروش"
- "سفارش ثبت شد"
- "موجودی کافی نیست"
- "فرمت عدد وارد شده صحیح نیست"

#### 2.3 پروفایل (`/profile`)

**مسیر**: `src/app/(main)/profile/page.jsx`

**ویژگی‌ها:**
- نمایش شماره موبایل کاربر
- دکمه "خروج" برای خروج از حساب کاربری

**کامپوننت‌های استفاده شده:**
- `application-ui/data-display/description-lists/left_aligned.jsx` - اطلاعات کاربر
- `application-ui/elements/buttons/primary_buttons.jsx` - دکمه خروج

**پیام‌های UI:**
- "پروفایل"
- "شماره موبایل"
- "خروج"

### 3. نوتیفیکیشن‌ها

**ویژگی‌ها:**
- آیکن زنگ در Top Bar با شمارنده (badge) نمایش تعداد نوتیفیکیشن‌های خوانده نشده
- با کلیک روی آیکن نوتیفیکیشن، یک Bottom Sheet باز می‌شود
- نمایش لیست نوتیفیکیشن‌ها در Bottom Sheet:
  - عنوان نوتیفیکیشن
  - زمان (مثلاً "۵ دقیقه پیش")
  - وضعیت خوانده/نخوانده (با استایل متفاوت)
- Empty State: اگر نوتیفیکیشن جدید وجود نداشته باشد، پیام "اعلانی ندارید" نمایش داده می‌شود

**کامپوننت‌های استفاده شده:**
- `application-ui/overlays/drawers/empty.jsx` - Bottom Sheet (با تغییرات برای باز شدن از پایین)
- `application-ui/overlays/notifications/simple.jsx` - آیتم نوتیفیکیشن
- `application-ui/lists/stacked-lists/simple.jsx` - لیست نوتیفیکیشن‌ها
- `application-ui/feedback/empty-states/simple.jsx` - Empty state

**پیام‌های UI:**
- "اعلانی ندارید"

## کامپوننت‌های مشترک

### Bottom Navigation

**مسیر**: `src/components/layout/BottomNavigation.jsx`

**ویژگی‌ها:**
- شامل سه آیتم: خانه | معامله | پروفایل
- نمایش در پایین صفحه (fixed)
- Active State واضح برای صفحه فعلی (رنگ بنفش)
- آیکون و متن برای هر آیتم
- RTL support کامل

**الگوی استفاده شده:**
- بر اساس `application-ui/navigation/tabs/tabs_in_pills.jsx`
- سفارشی‌سازی شده برای Bottom Navigation

### Top Bar

**مسیر**: `src/components/layout/TopBar.jsx`

**ویژگی‌ها:**
- نمایش نام کوین (TWIN) در سمت راست (در RTL)
- آیکن نوتیفیکیشن با badge شمارنده در سمت چپ (در RTL)
- با کلیک روی آیکن، Bottom Sheet نوتیفیکیشن باز می‌شود

## تم و استایل

### رنگ‌های پروژه

| نوع | رنگ Tailwind | کد Hex | استفاده |
|-----|-------------|--------|---------|
| **Primary** | `purple-600`, `purple-700` | `#9333EA`, `#7E22CE` | دکمه‌های اصلی، لینک‌ها، Active states |
| **Background** | `slate-50`, `slate-100`, `slate-200` | `#F8FAFC`, `#F1F5F9`, `#E2E8F0` | پس‌زمینه‌های اصلی (تم نقره‌ای) |
| **Text Primary** | `gray-900` | `#111827` | متن اصلی |
| **Text Secondary** | `gray-700` | `#374151` | متن ثانویه |
| **Text Muted** | `gray-500` | `#6B7280` | متن کم‌رنگ |
| **Success** | `green-500`, `green-600` | `#22C55E`, `#16A34A` | پیام‌های موفقیت، قیمت مثبت |
| **Error** | `red-500`, `red-600` | `#EF4444`, `#DC2626` | پیام‌های خطا، قیمت منفی |
| **Warning** | `yellow-500`, `yellow-600` | `#EAB308`, `#CA8A04` | هشدارها |
| **Border** | `gray-200`, `gray-300` | `#E5E7EB`, `#D1D5DB` | حاشیه‌ها |

### RTL Support

**قوانین RTL که باید در تمام کامپوننت‌ها رعایت شود:**

1. **اضافه کردن dir="rtl"**: همیشه در المان اصلی کامپوننت
   ```jsx
   <div dir="rtl" className="rtl">
   ```

2. **استفاده از کلاس‌های منطقی:**
   - `ms-` (margin-start) به جای `ml-` (margin-left)
   - `me-` (margin-end) به جای `mr-` (margin-right)
   - `ps-` (padding-start) به جای `pl-` (padding-left)
   - `pe-` (padding-end) به جای `pr-` (padding-right)
   - `start-` به جای `left-`
   - `end-` به جای `right-`
   - `text-start` به جای `text-left`
   - `text-end` به جای `text-right`

3. **ترتیب المان‌ها:**
   - در Flex و Grid، ترتیب بصری معکوس می‌شود
   - آیکون‌ها باید در سمت مخالف قرار گیرند (ChevronRight → ChevronLeft)

4. **Tailwind RTL Plugin:**
   - استفاده از `tailwindcss-rtl` plugin
   - کلاس `rtl:` برای استایل‌های خاص RTL

**مثال تغییرات:**
```jsx
// قبل (LTR)
<div className="ml-4 mr-2 pl-6 pr-3 left-0 text-left">
  <Icon className="ml-2" />
  <span>Text</span>
</div>

// بعد (RTL)
<div dir="rtl" className="ms-4 me-2 ps-6 pe-3 start-0 text-start rtl">
  <span>متن</span>
  <Icon className="me-2" />
</div>
```

## وضعیت‌ها (States)

### Loading State

**استفاده:**
- هنگام دریافت اطلاعات از سرور
- هنگام لود شدن صفحه‌ها
- هنگام ثبت سفارش

**کامپوننت:**
- استفاده از `application-ui/feedback/empty-states/` با spinner
- یا استفاده از skeleton loaders

**نمایش:**
- Spinner در مرکز صفحه یا بخش مربوطه
- یا skeleton برای محتوای در حال لود

### Error State

**انواع خطا:**
- خطاهای اتصال به اینترنت/سرور
- خطاهای اعتبارسنجی (موجودی کافی نیست، فرمت اشتباه)
- خطاهای API

**کامپوننت:**
- استفاده از `application-ui/feedback/alerts/` برای پیام‌های خطا
- رنگ قرمز برای خطاها

**نمایش:**
- پیام خطا در بالای فرم یا در بخش مربوطه
- دکمه "تلاش مجدد" در صورت خطای اتصال

### Success State

**استفاده:**
- پس از ثبت سفارش موفق
- پس از ورود موفق
- پس از انجام تراکنش

**کامپوننت:**
- استفاده از `application-ui/overlays/notifications/simple.jsx` برای پیام موفقیت
- رنگ سبز برای موفقیت

**نمایش:**
- نوتیفیکیشن موقت در بالای صفحه
- یا پیام موفقیت در صفحه

### Empty State

**استفاده:**
- دارایی خالی (بدون TWIN)
- تراکنش‌های خالی
- نوتیفیکیشن‌های خالی

**کامپوننت:**
- استفاده از `application-ui/feedback/empty-states/simple.jsx`

**نمایش:**
- آیکن
- عنوان (مثلاً "هنوز TWIN ندارید")
- توضیحات (اختیاری)
- CTA (در صورت نیاز، مثلاً "شروع معامله")

## جدول Mapping کامپوننت‌ها

| صفحه/بخش | کامپوننت‌های استفاده شده | مسیر در ui-blocks | تغییرات لازم |
|---------|------------------------|------------------|-------------|
| **ورود** | | | |
| فرم ورود | فرم ورود ساده | `application-ui/forms/sign-in-forms/simple.jsx` | فارسی‌سازی، RTL، تغییر رنگ به purple |
| فیلد شماره موبایل | ورودی با برچسب | `application-ui/forms/input-groups/input_with_label.jsx` | فارسی‌سازی، RTL |
| فیلد رمز عبور | ورودی با برچسب | `application-ui/forms/input-groups/input_with_label.jsx` | فارسی‌سازی، RTL |
| نمایش خطا | ورودی با خطا | `application-ui/forms/input-groups/input_with_validation_error.jsx` | فارسی‌سازی، RTL |
| **Portfolio** | | | |
| نمایش دارایی‌ها | آمار در کارت‌ها | `application-ui/data-display/stats/simple_in_cards.jsx` | فارسی‌سازی، RTL، تغییر رنگ |
| لیست تراکنش‌ها | لیست پشته‌ای | `application-ui/lists/stacked-lists/simple.jsx` | فارسی‌سازی، RTL |
| حالت خالی | حالت خالی | `application-ui/feedback/empty-states/simple.jsx` | فارسی‌سازی، RTL |
| کارت‌های دارایی | کارت پایه | `application-ui/layout/cards/basic_card.jsx` | فارسی‌سازی، RTL |
| **Trade** | | | |
| Order Book | جدول ساده | `application-ui/lists/tables/simple.jsx` | فارسی‌سازی، RTL، رنگ‌بندی خرید/فروش |
| فرم سفارش | فرم دو ستونه | `application-ui/forms/form-layouts/two_column.jsx` | فارسی‌سازی، RTL |
| انتخاب Market/Limit | رادیو گروه | `application-ui/forms/radio-groups/simple_list.jsx` | فارسی‌سازی، RTL |
| فیلدهای فرم | ورودی با برچسب | `application-ui/forms/input-groups/input_with_label.jsx` | فارسی‌سازی، RTL |
| **Profile** | | | |
| اطلاعات کاربر | لیست توضیحات | `application-ui/data-display/description-lists/left_aligned.jsx` | فارسی‌سازی، RTL (تغییر به right_aligned) |
| دکمه خروج | دکمه اصلی | `application-ui/elements/buttons/primary_buttons.jsx` | فارسی‌سازی، RTL، تغییر رنگ به purple |
| **نوتیفیکیشن** | | | |
| Bottom Sheet | دراور خالی | `application-ui/overlays/drawers/empty.jsx` | تغییر به باز شدن از پایین، RTL |
| آیتم نوتیفیکیشن | نوتیفیکیشن | `application-ui/overlays/notifications/simple.jsx` | فارسی‌سازی، RTL |
| لیست نوتیفیکیشن‌ها | لیست پشته‌ای | `application-ui/lists/stacked-lists/simple.jsx` | فارسی‌سازی، RTL |
| **مشترک** | | | |
| Bottom Navigation | تب‌ها در پیل | `application-ui/navigation/tabs/tabs_in_pills.jsx` | سفارشی برای Bottom، RTL |
| Top Bar | نوار ناوبری | `application-ui/navigation/navbars/` | سفارشی، RTL |

## پیام‌های UI (Microcopy)

تمام پیام‌های UI باید به فارسی باشند:

### ورود
- "ورود / ادامه با شماره موبایل"
- "شماره موبایل"
- "رمز عبور"
- "فراموشی رمز عبور"
- "شماره موبایل وارد شده صحیح نیست"
- "رمز عبور اشتباه است"

### Portfolio
- "دارایی شما"
- "مقدار TWIN"
- "معادل تومان"
- "قیمت لحظه‌ای TWIN"
- "تراکنش‌های اخیر"
- "هنوز TWIN ندارید"
- "شروع معامله"

### Trade
- "نوع سفارش"
- "Market"
- "Limit"
- "مقدار (TWIN)"
- "قیمت (تومان)"
- "کارمزد"
- "خرید"
- "فروش"
- "سفارش ثبت شد"
- "موجودی کافی نیست"
- "فرمت عدد وارد شده صحیح نیست"

### Profile
- "پروفایل"
- "شماره موبایل"
- "خروج"

### نوتیفیکیشن
- "اعلانی ندارید"

## قوانین توسعه

### 1. RTL First
- همیشه ابتدا RTL را در نظر بگیرید
- از کلاس‌های منطقی استفاده کنید
- تست کنید که در RTL درست کار می‌کند

### 2. Mobile First
- طراحی برای موبایل (حداقل 360x800)
- سپس responsive برای تبلت و دسکتاپ

### 3. رنگ‌ها
- همیشه از رنگ‌های تعریف شده در تم استفاده کنید
- `purple-600` برای primary
- `slate-*` برای background
- هرگز `indigo-*` یا `gray-*` برای background استفاده نکنید

### 4. کامپوننت‌ها
- همیشه از ui-blocks کپی کنید، نه import مستقیم
- پس از کپی، فارسی‌سازی و RTL را اعمال کنید
- رنگ‌ها را تغییر دهید

### 5. نام‌گذاری
- فایل‌ها: PascalCase (مثلاً `LoginForm.jsx`)
- کامپوننت‌ها: PascalCase
- متغیرها: camelCase
- ثابت‌ها: UPPER_SNAKE_CASE

### 6. ساختار فایل
```jsx
'use client' // اگر نیاز به client component است

import { ... } from '...'

export default function ComponentName() {
  return (
    <div dir="rtl" className="rtl">
      {/* محتوا */}
    </div>
  )
}
```

## API و State Management

### API Endpoints (مثال)

```
POST /api/auth/login
POST /api/auth/logout
GET  /api/portfolio
GET  /api/trade/price
GET  /api/trade/orderbook
POST /api/trade/order
GET  /api/transactions
GET  /api/notifications
```

### State Management

- استفاده از React Context برای state سراسری
- یا Zustand برای state management پیچیده‌تر
- Local state با useState برای state محلی

## تست

### موارد تست

1. **RTL**: تمام صفحات در RTL درست نمایش داده شوند
2. **موبایل**: تمام صفحات در سایز 360x800 درست کار کنند
3. **رنگ‌ها**: رنگ‌های purple و slate استفاده شده باشند
4. **فارسی**: تمام متن‌ها فارسی باشند
5. **تعاملات**: تمام دکمه‌ها و لینک‌ها کار کنند
6. **Empty States**: در حالت خالی پیام مناسب نمایش داده شود
7. **Error Handling**: خطاها به درستی نمایش داده شوند

## منابع

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS RTL Plugin](https://github.com/20lives/tailwindcss-rtl)
- [Headless UI](https://headlessui.com/)
- [TradingView Widget](https://www.tradingview.com/widget-docs/)

