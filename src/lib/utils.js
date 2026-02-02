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

/** ارقام فارسی برای نمایش */
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

/**
 * تبدیل اعداد فارسی و عربی به انگلیسی
 * ۰-۹ (فارسی) و ٠-٩ (عربی) → 0-9
 */
export function toEnglishDigits(str) {
  if (str == null || typeof str !== 'string') return ''
  const persian = PERSIAN_DIGITS
  const arabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  let result = str
  for (let i = 0; i < 10; i++) {
    result = result.replaceAll(persian[i], String(i)).replaceAll(arabic[i], String(i))
  }
  return result
}

/**
 * تبدیل ارقام انگلیسی به فارسی برای نمایش (مثلاً تایمر ۰۲:۰۰)
 */
export function toPersianDigits(str) {
  if (str == null) return ''
  return String(str).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)])
}

/**
 * نرمال‌سازی مقدار اینپوت عددی: اعداد فارسی/عربی به انگلیسی، فقط رقم و (اختیاری) نقطه اعشاری
 */
export function normalizeNumericInput(value, allowDecimal = false) {
  const en = toEnglishDigits(String(value ?? ''))
  if (allowDecimal) {
    const parts = en.replace(/[^\d.]/g, '').split('.')
    if (parts.length > 2) parts.splice(2)
    return parts.join('.')
  }
  return en.replace(/\D/g, '')
}

/**
 * اعتبارسنجی شماره موبایل (فارسی و انگلیسی) - ۱۱ رقم، با 09 شروع شود
 * مثال معتبر: 09121111111 یا ۰۹۱۲۱۱۱۱۱۱۱
 */
export function validateMobile(mobile) {
  const normalized = toEnglishDigits(String(mobile ?? '')).replace(/\D/g, '')
  return normalized.length === 11 && /^09\d{9}$/.test(normalized)
}

const OTP_LENGTH = 6
const PASSWORD_MIN_LENGTH = 8

/**
 * اعتبارسنجی رمز قوی
 * حداقل ۸ کاراکتر، حداقل یک حرف، حداقل یک عدد
 */
export function validateStrongPassword(password) {
  const p = String(password ?? '')
  if (p.length < PASSWORD_MIN_LENGTH) {
    return { valid: false, message: `رمز عبور حداقل ${PASSWORD_MIN_LENGTH} کاراکتر باشد` }
  }
  if (!/[a-zA-Z]/.test(p)) {
    return { valid: false, message: 'رمز عبور حداقل یک حرف انگلیسی داشته باشد' }
  }
  if (!/\d/.test(p)) {
    return { valid: false, message: 'رمز عبور حداقل یک عدد داشته باشد' }
  }
  return { valid: true }
}

/**
 * نرمال OTP: فقط رقم (فارسی/عربی به انگلیسی)
 */
export function normalizeOtp(otp) {
  return toEnglishDigits(String(otp ?? '')).replace(/\D/g, '')
}

/**
 * اعتبارسنجی OTP (۵ یا ۶ رقم)
 */
export function validateOtp(otp) {
  const normalized = normalizeOtp(otp)
  return normalized.length === OTP_LENGTH && /^\d+$/.test(normalized)
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

