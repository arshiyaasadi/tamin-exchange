/**
 * فرمت کردن اعداد به فارسی
 */
export function formatNumber(num) {
  return new Intl.NumberFormat('fa-IR').format(num)
}

/**
 * فرمت کردن قیمت به تومان
 */
export function formatPrice(price) {
  return `${formatNumber(price)} تومان`
}

/**
 * فرمت کردن تاریخ به فارسی
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

/**
 * اعتبارسنجی شماره موبایل
 */
export function validateMobile(mobile) {
  const mobileRegex = /^09\d{9}$/
  return mobileRegex.test(mobile)
}

/**
 * کلاس‌های شرطی
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * ذخیره توکن در کوکی
 */
export function setToken(token) {
  if (typeof document !== 'undefined') {
    // تنظیم کوکی با مدت اعتبار 30 روز
    const expires = new Date()
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 روز
    document.cookie = `auth_token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
  }
}

/**
 * دریافت توکن از کوکی
 */
export function getToken() {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === 'auth_token') {
        return value
      }
    }
  }
  return null
}

/**
 * حذف توکن از کوکی
 */
export function removeToken() {
  if (typeof document !== 'undefined') {
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }
}

/**
 * بررسی اینکه کاربر لاگین کرده است یا نه
 */
export function isAuthenticated() {
  return getToken() !== null
}

