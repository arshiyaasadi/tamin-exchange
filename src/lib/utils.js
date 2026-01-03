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

