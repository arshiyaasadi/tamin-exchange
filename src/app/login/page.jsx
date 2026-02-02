'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ChevronRightIcon,
  ChevronDownIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
  DevicePhoneMobileIcon,
  ExclamationCircleIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import {
  validateMobile,
  setToken,
  isAuthenticated,
  normalizeNumericInput,
  toEnglishDigits,
  toPersianDigits,
  validateStrongPassword,
  validateOtp,
  normalizeOtp,
} from '@/lib/utils'
import { config } from '@/lib/config'
import { cn } from '@/lib/utils'
import {
  checkUserByMobile,
  verifyPassword,
  sendOtp,
  verifyOtp,
  register,
  loginAfterOtp,
  resetPassword,
} from '@/lib/authMock'
import ClickSpark from '@/components/ui/ClickSpark'

const STEPS = {
  mobile: 'mobile',
  password: 'password',
  otp_login: 'otp_login',
  otp_register: 'otp_register',
  set_password: 'set_password',
  forgot_otp: 'forgot_otp',
  forgot_new_password: 'forgot_new_password',
}

const STEP_TITLES = {
  [STEPS.mobile]: 'ورود و ثبت نام',
  [STEPS.password]: 'رمز عبور',
  [STEPS.otp_login]: 'کد تأیید ورود',
  [STEPS.otp_register]: 'کد تأیید ثبت‌نام',
  [STEPS.set_password]: 'تعیین رمز عبور',
  [STEPS.forgot_otp]: 'بازیابی رمز عبور',
  [STEPS.forgot_new_password]: 'رمز عبور جدید',
}

/** نمونه‌های قابل کلیک برای پر کردن فیلد (فقط برای تست) */
const SAMPLE_MOBILE = '09121111111'
const SAMPLE_PASSWORD = 'Test1234'
const SAMPLE_OTP = '123456'

const OTP_TIMER_SECONDS = 120

const OTP_STEPS = [STEPS.otp_login, STEPS.otp_register, STEPS.forgot_otp]

function formatTimer(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/** بلوک مشترک: نمایش شماره موبایل با آیکن، سپس اسلات محتوا (فیلد OTP)، سپس تایمر و ارسال مجدد */
function OtpExtraBlock({ mobile, otpCountdown, onResend, onEditMobile, children }) {
  const timerText = toPersianDigits(formatTimer(otpCountdown))
  return (
    <>
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <DevicePhoneMobileIcon className="size-5 shrink-0 text-slate-400" aria-hidden />
        <p className="min-w-0 flex-1 text-sm text-slate-300">
          کد تأیید به شماره <span className="font-bold text-slate-100">{mobile}</span> ارسال شد.
        </p>
        {onEditMobile && (
          <button
            type="button"
            onClick={onEditMobile}
            className="flex shrink-0 items-center justify-center rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800"
            aria-label="ویرایش شماره موبایل"
          >
            <PencilSquareIcon className="size-5" />
          </button>
        )}
      </div>
      {children}
      <div className="mb-4 flex flex-col items-center gap-2">
        {otpCountdown > 0 ? (
          <span className="text-sm text-slate-500">
            ارسال مجدد پس از {timerText}
          </span>
        ) : (
          <button
            type="button"
            onClick={onResend}
            className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
          >
            ارسال مجدد کد
          </button>
        )}
      </div>
    </>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState(STEPS.mobile)
  const [mobile, setMobile] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [showInviteCode, setShowInviteCode] = useState(false)
  const [userExists, setUserExists] = useState(null)
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [domain, setDomain] = useState('')
  const [otpCountdown, setOtpCountdown] = useState(0)

  useEffect(() => {
    setDomain(typeof window !== 'undefined' ? window.location.origin : '')
  }, [])

  useEffect(() => {
    if (OTP_STEPS.includes(step)) {
      setOtpCountdown(OTP_TIMER_SECONDS)
    }
  }, [step])

  useEffect(() => {
    if (!OTP_STEPS.includes(step) || otpCountdown <= 0) return
    const id = setInterval(() => {
      setOtpCountdown((prev) => (prev <= 1 ? 0 : prev - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [step, otpCountdown])

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/')
    }
  }, [router])

  const goBack = () => {
    setError('')
    if (step === STEPS.mobile) {
      router.push('/home')
      return
    }
    if (step === STEPS.password) setStep(STEPS.mobile)
    else if (step === STEPS.otp_login) setStep(STEPS.password)
    else if (step === STEPS.otp_register) setStep(STEPS.mobile)
    else if (step === STEPS.set_password) setStep(STEPS.otp_register)
    else if (step === STEPS.forgot_otp) setStep(STEPS.password)
    else if (step === STEPS.forgot_new_password) setStep(STEPS.forgot_otp)
  }

  const finishAuth = (token) => {
    setToken(token)
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    } else {
      router.replace('/')
    }
  }

  const handleSubmitMobile = async (e) => {
    e.preventDefault()
    setError('')
    if (!validateMobile(mobile)) {
      setError('شماره موبایل وارد شده صحیح نیست')
      return
    }
    setLoading(true)
    try {
      const { exists } = await checkUserByMobile(mobile)
      setUserExists(exists)
      if (exists) {
        setStep(STEPS.password)
      } else {
        await sendOtp(mobile, 'register')
        setStep(STEPS.otp_register)
      }
    } catch (err) {
      setError('خطا در بررسی شماره. لطفا دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitPassword = async (e) => {
    e.preventDefault()
    setError('')
    if (!password) {
      setError('رمز عبور را وارد کنید')
      return
    }
    setLoading(true)
    try {
      const { success } = await verifyPassword(mobile, password)
      if (success) {
        await sendOtp(mobile, 'login')
        setStep(STEPS.otp_login)
      } else {
        setError('رمز عبور اشتباه است')
      }
    } catch (err) {
      setError('خطا در ورود. لطفا دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitOtpLogin = async (e) => {
    e.preventDefault()
    setError('')
    const normalized = normalizeOtp(otp)
    if (!validateOtp(otp)) {
      setError('کد تأیید باید ۶ رقم باشد')
      return
    }
    setLoading(true)
    try {
      const { token } = await loginAfterOtp(mobile, normalized)
      finishAuth(token)
    } catch (err) {
      setError('کد تأیید اشتباه است')
      setLoading(false)
    }
  }

  const handleSubmitOtpRegister = async (e) => {
    e.preventDefault()
    setError('')
    if (!validateOtp(otp)) {
      setError('کد تأیید باید ۶ رقم باشد')
      return
    }
    setLoading(true)
    try {
      const normalized = normalizeOtp(otp)
      const { success } = await verifyOtp(mobile, normalized, 'register')
      if (success) {
        setStep(STEPS.set_password)
      } else {
        setError('کد تأیید اشتباه است')
      }
    } catch (err) {
      setError('کد تأیید اشتباه است')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitSetPassword = async (e) => {
    e.preventDefault()
    setError('')
    const strong = validateStrongPassword(newPassword)
    if (!strong.valid) {
      setError(strong.message)
      return
    }
    if (newPassword !== confirmPassword) {
      setError('رمز عبور و تکرار آن یکسان نیستند')
      return
    }
    setLoading(true)
    try {
      const normalizedOtp = normalizeOtp(otp)
      const { token } = await register(mobile, normalizedOtp, newPassword, inviteCode)
      finishAuth(token)
    } catch (err) {
      setError('خطا در ثبت‌نام. لطفا دوباره تلاش کنید.')
      setLoading(false)
    }
  }

  const handleForgotPasswordClick = async () => {
    setError('')
    setLoading(true)
    try {
      await sendOtp(mobile, 'forgot')
      setStep(STEPS.forgot_otp)
    } catch (err) {
      setError('خطا در ارسال کد. لطفا دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitForgotOtp = async (e) => {
    e.preventDefault()
    setError('')
    if (!validateOtp(otp)) {
      setError('کد تأیید باید ۶ رقم باشد')
      return
    }
    setLoading(true)
    try {
      const normalized = normalizeOtp(otp)
      const { success } = await verifyOtp(mobile, normalized, 'forgot')
      if (success) {
        setStep(STEPS.forgot_new_password)
      } else {
        setError('کد تأیید اشتباه است')
      }
    } catch (err) {
      setError('کد تأیید اشتباه است')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (otpCountdown > 0) return
    setError('')
    try {
      if (step === STEPS.otp_login) await sendOtp(mobile, 'login')
      else if (step === STEPS.otp_register) await sendOtp(mobile, 'register')
      else if (step === STEPS.forgot_otp) await sendOtp(mobile, 'forgot')
      setOtpCountdown(OTP_TIMER_SECONDS)
    } catch (err) {
      setError('خطا در ارسال مجدد کد.')
    }
  }

  /** بازگشت به مرحله موبایل برای ویرایش شماره (در مراحل OTP) */
  const handleEditMobile = () => {
    setError('')
    setOtp('')
    setStep(STEPS.mobile)
  }

  const handleSubmitForgotNewPassword = async (e) => {
    e.preventDefault()
    setError('')
    const strong = validateStrongPassword(newPassword)
    if (!strong.valid) {
      setError(strong.message)
      return
    }
    if (newPassword !== confirmPassword) {
      setError('رمز عبور و تکرار آن یکسان نیستند')
      return
    }
    setLoading(true)
    try {
      const normalizedOtp = normalizeOtp(otp)
      const { token } = await resetPassword(mobile, normalizedOtp, newPassword)
      finishAuth(token)
    } catch (err) {
      setError('خطا در تغییر رمز. لطفا دوباره تلاش کنید.')
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border-0 bg-transparent px-4 py-3.5 pe-20 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0'
  const inputClassPlain =
    'glass-input w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-slate-100 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500'
  const labelClass = 'mb-1.5 block text-sm font-medium text-slate-300'
  const btnPrimary =
    'mt-5 w-full rounded-xl bg-primary-600 px-4 py-3.5 text-base font-bold text-white shadow-lg shadow-primary-600/25 transition-colors hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed'
  /** بلوک خطا برای همه فرم‌ها */
  const ErrorAlert = ({ message }) =>
    message ? (
      <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-start">
        <ExclamationCircleIcon className="size-5 shrink-0 text-red-400 mt-0.5" aria-hidden />
        <p className="text-sm text-red-300">{message}</p>
      </div>
    ) : null

  /** validation: { isValid: true|false|undefined, message: string } - undefined = نه خطا نه موفق */
  const renderPasswordField = (id, value, onChange, placeholder, show, setShow, validation) => {
    const hasValidation = validation && value.length > 0
    const isInvalid = hasValidation && validation.isValid === false
    const isValid = hasValidation && validation.isValid === true
    const wrapperClass = cn(
      'relative rounded-xl border bg-white/5 transition-colors',
      isInvalid && 'border-red-500 focus-within:ring-1 focus-within:ring-red-500',
      isValid && 'border-green-500',
      !hasValidation && 'border-white/10 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500'
    )
    return (
      <div>
        <div className={wrapperClass}>
          <input
            id={id}
            type={show ? 'text' : 'password'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={inputClass}
            autoComplete={id.includes('new') ? 'new-password' : 'current-password'}
          />
          <div className="absolute end-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
            {hasValidation && (
              <span className="flex shrink-0">
                {isValid ? (
                  <CheckCircleIcon className="size-5 text-green-500" aria-hidden />
                ) : (
                  <XCircleIcon className="size-5 text-red-500" aria-hidden />
                )}
              </span>
            )}
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="text-slate-400 hover:text-slate-200"
              aria-label={show ? 'پنهان کردن رمز' : 'نمایش رمز'}
            >
              {show ? <EyeSlashIcon className="size-5" /> : <EyeIcon className="size-5" />}
            </button>
          </div>
        </div>
        {isInvalid && validation?.message && (
          <p className="mt-1.5 text-sm text-red-400">{validation.message}</p>
        )}
      </div>
    )
  }

  return (
    <ClickSpark sparkColor="#9333EA" sparkSize={8} sparkRadius={20} sparkCount={12} duration={500}>
      <div dir="rtl" className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-6 rtl">
        <div className="w-full max-w-lg flex flex-col rounded-2xl glass-card p-6 shadow-xl">
        <header className="border-b border-white/10 pb-3 mb-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              className="flex size-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              aria-label="بازگشت"
            >
              <ChevronRightIcon className="size-6" />
            </button>
            <h1 className="flex-1 text-center text-base font-bold text-slate-100">
              {config.brandNameFa}
            </h1>
            <span className="size-10 shrink-0" aria-hidden />
          </div>
        </header>

        <main className="flex flex-1 flex-col pt-6">
          {step === STEPS.mobile ? (
            <div className="mb-6 text-center">
              <p className="text-2xl font-bold text-slate-100 sm:text-3xl tracking-tight">
                {config.getLoginTitle()}
              </p>
              <p className="mt-1.5 text-sm text-slate-400">{config.loginSubtitle}</p>
            </div>
          ) : (
            <div className="mb-6 text-center">
              <h2 className="text-lg font-semibold text-slate-200 sm:text-xl">
                {STEP_TITLES[step]}
              </h2>
            </div>
          )}

          {/* مرحله موبایل */}
          {step === STEPS.mobile && (
            <form onSubmit={handleSubmitMobile} className="flex flex-col">
              <div className="mb-4">
                <label htmlFor="mobile" className={labelClass}>
                  شماره موبایل{' '}
                  <button
                    type="button"
                    onClick={() => setMobile(SAMPLE_MOBILE)}
                    className="text-xs text-slate-500 font-normal underline decoration-dotted hover:text-primary-400 hover:decoration-primary-400 transition-colors cursor-pointer"
                  >
                    (نمونه: ۰۹۱۲۱۱۱۱۱۱۱)
                  </button>
                </label>
                <input
                  id="mobile"
                  name="mobile_number"
                  type="text"
                  inputMode="numeric"
                  maxLength={11}
                  value={mobile}
                  onChange={(e) => setMobile(normalizeNumericInput(e.target.value, false).slice(0, 11))}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className={inputClassPlain}
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setShowInviteCode(!showInviteCode)}
                  className="flex w-full items-center justify-start gap-2 py-2 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
                >
                  <span>کد دعوت (اختیاری)</span>
                  <ChevronDownIcon
                    className={cn('size-5 shrink-0 transition-transform', showInviteCode && 'rotate-180')}
                  />
                </button>
                {showInviteCode && (
                  <div className="mt-2">
                    <input
                      name="invite_code"
                      type="text"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(toEnglishDigits(e.target.value))}
                      placeholder="کد دعوت را وارد کنید. (اختیاری)"
                      className={inputClassPlain}
                    />
                    <p className="mt-2 flex items-start gap-2 text-xs text-slate-500">
                      <span className="mt-0.5 shrink-0 text-amber-400" aria-hidden>
                        ⓘ
                      </span>
                      کد دعوت صرفا در زمان ثبت‌نام قابل استفاده است.
                    </p>
                  </div>
                )}
              </div>
              <ErrorAlert message={error} />
              <button type="submit" disabled={loading} className={btnPrimary}>
                {loading ? 'در حال بررسی...' : 'ثبت و ادامه'}
              </button>
            </form>
          )}

          {/* مرحله رمز (کاربر موجود) */}
          {step === STEPS.password && (
            <form onSubmit={handleSubmitPassword} className="flex flex-col">
              <p className="mb-5 text-sm text-slate-400 leading-relaxed">
                رمز عبور حساب خود را وارد کنید.
              </p>
              <div className="mb-2">
                <label htmlFor="password" className={labelClass}>
                  رمز عبور{' '}
                  <button
                    type="button"
                    onClick={() => setPassword(SAMPLE_PASSWORD)}
                    className="text-xs text-slate-500 font-normal underline decoration-dotted hover:text-primary-400 hover:decoration-primary-400 transition-colors cursor-pointer"
                  >
                    (نمونه: {SAMPLE_PASSWORD})
                  </button>
                </label>
                {renderPasswordField(
                  'password',
                  password,
                  setPassword,
                  'رمز عبور را وارد کنید',
                  showPassword,
                  setShowPassword
                )}
              </div>
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="mb-4 text-start text-sm font-medium text-primary-400 hover:text-primary-300"
              >
                فراموشی رمز عبور
              </button>
              <ErrorAlert message={error} />
              <button type="submit" disabled={loading} className={btnPrimary}>
                {loading ? 'در حال بررسی...' : 'ورود'}
              </button>
            </form>
          )}

          {/* مرحله OTP ورود */}
          {step === STEPS.otp_login && (
            <form onSubmit={handleSubmitOtpLogin} className="flex flex-col">
              <OtpExtraBlock
                mobile={mobile}
                otpCountdown={otpCountdown}
                onResend={handleResendOtp}
                onEditMobile={handleEditMobile}
              >
                <div className="mb-4">
                  <label htmlFor="otp_login" className={labelClass}>
                    کد تأیید (ورود){' '}
                    <button
                      type="button"
                      onClick={() => setOtp(SAMPLE_OTP)}
                      className="text-xs text-slate-500 font-normal underline decoration-dotted hover:text-primary-400 hover:decoration-primary-400 transition-colors cursor-pointer"
                    >
                      (نمونه: ۱۲۳۴۵۶)
                    </button>
                  </label>
                  <input
                    id="otp_login"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(normalizeNumericInput(e.target.value, false))}
                    placeholder="۶ رقم"
                    className={inputClassPlain}
                    autoFocus
                  />
                </div>
              </OtpExtraBlock>
              <ErrorAlert message={error} />
              <button type="submit" disabled={loading} className={btnPrimary}>
                {loading ? 'در حال بررسی...' : 'تأیید و ورود'}
              </button>
            </form>
          )}

          {/* مرحله OTP ثبت‌نام */}
          {step === STEPS.otp_register && (
            <form onSubmit={handleSubmitOtpRegister} className="flex flex-col">
              <OtpExtraBlock
                mobile={mobile}
                otpCountdown={otpCountdown}
                onResend={handleResendOtp}
                onEditMobile={handleEditMobile}
              >
                <div className="mb-4">
                  <label htmlFor="otp_register" className={labelClass}>
                    کد تأیید (ثبت‌نام){' '}
                    <button
                      type="button"
                      onClick={() => setOtp(SAMPLE_OTP)}
                      className="text-xs text-slate-500 font-normal underline decoration-dotted hover:text-primary-400 hover:decoration-primary-400 transition-colors cursor-pointer"
                    >
                      (نمونه: ۱۲۳۴۵۶)
                    </button>
                  </label>
                  <input
                    id="otp_register"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(normalizeNumericInput(e.target.value, false))}
                    placeholder="۶ رقم"
                    className={inputClassPlain}
                    autoFocus
                  />
                </div>
              </OtpExtraBlock>
              <ErrorAlert message={error} />
              <button type="submit" disabled={loading} className={btnPrimary}>
                {loading ? 'در حال بررسی...' : 'تأیید'}
              </button>
            </form>
          )}

          {/* مرحله تعیین رمز عبور (ثبت‌نام) */}
          {step === STEPS.set_password && (
            <form onSubmit={handleSubmitSetPassword} className="flex flex-col">
              <p className="mb-5 text-sm text-slate-400 leading-relaxed">
                رمز عبور حساب خود را تعیین کنید.
              </p>
              <div className="mb-4">
                <label htmlFor="new_password" className={labelClass}>
                  رمز عبور
                </label>
                {renderPasswordField(
                  'new_password',
                  newPassword,
                  setNewPassword,
                  'حداقل ۸ کاراکتر، یک حرف و یک عدد',
                  showPassword,
                  setShowPassword,
                  newPassword.length > 0
                    ? { isValid: validateStrongPassword(newPassword).valid, message: validateStrongPassword(newPassword).message }
                    : undefined
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="confirm_password" className={labelClass}>
                  تکرار رمز عبور
                </label>
                {renderPasswordField(
                  'confirm_password',
                  confirmPassword,
                  setConfirmPassword,
                  'رمز عبور را دوباره وارد کنید',
                  showConfirmPassword,
                  setShowConfirmPassword,
                  confirmPassword.length > 0
                    ? {
                        isValid: confirmPassword === newPassword && validateStrongPassword(newPassword).valid,
                        message: confirmPassword !== newPassword ? 'رمز عبور و تکرار آن یکسان نیستند' : '',
                      }
                    : undefined
                )}
              </div>
              <ErrorAlert message={error} />
              <button type="submit" disabled={loading} className={btnPrimary}>
                {loading ? 'در حال ثبت...' : 'ثبت‌نام و ورود'}
              </button>
            </form>
          )}

          {/* مرحله OTP بازیابی رمز عبور */}
          {step === STEPS.forgot_otp && (
            <form onSubmit={handleSubmitForgotOtp} className="flex flex-col">
              <OtpExtraBlock
                mobile={mobile}
                otpCountdown={otpCountdown}
                onResend={handleResendOtp}
                onEditMobile={handleEditMobile}
              >
                <div className="mb-4">
                  <label htmlFor="otp_forgot" className={labelClass}>
                    کد تأیید (بازیابی رمز){' '}
                    <button
                      type="button"
                      onClick={() => setOtp(SAMPLE_OTP)}
                      className="text-xs text-slate-500 font-normal underline decoration-dotted hover:text-primary-400 hover:decoration-primary-400 transition-colors cursor-pointer"
                    >
                      (نمونه: ۱۲۳۴۵۶)
                    </button>
                  </label>
                  <input
                    id="otp_forgot"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(normalizeNumericInput(e.target.value, false))}
                    placeholder="۶ رقم"
                    className={inputClassPlain}
                    autoFocus
                  />
                </div>
              </OtpExtraBlock>
              <ErrorAlert message={error} />
              <button type="submit" disabled={loading} className={btnPrimary}>
                {loading ? 'در حال بررسی...' : 'تأیید و ادامه'}
              </button>
            </form>
          )}

          {/* مرحله رمز عبور جدید (بعد از بازیابی) */}
          {step === STEPS.forgot_new_password && (
            <form onSubmit={handleSubmitForgotNewPassword} className="flex flex-col">
              <p className="mb-5 text-sm text-slate-400 leading-relaxed">
                رمز عبور جدید خود را برای ورود به حساب وارد کنید.
              </p>
              <div className="mb-4">
                <label htmlFor="forgot_new_password" className={labelClass}>
                  رمز عبور جدید
                </label>
                {renderPasswordField(
                  'forgot_new_password',
                  newPassword,
                  setNewPassword,
                  'حداقل ۸ کاراکتر، یک حرف و یک عدد',
                  showPassword,
                  setShowPassword,
                  newPassword.length > 0
                    ? { isValid: validateStrongPassword(newPassword).valid, message: validateStrongPassword(newPassword).message }
                    : undefined
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="forgot_confirm_password" className={labelClass}>
                  تکرار رمز عبور جدید
                </label>
                {renderPasswordField(
                  'forgot_confirm_password',
                  confirmPassword,
                  setConfirmPassword,
                  'رمز عبور جدید را دوباره وارد کنید',
                  showConfirmPassword,
                  setShowConfirmPassword,
                  confirmPassword.length > 0
                    ? {
                        isValid: confirmPassword === newPassword && validateStrongPassword(newPassword).valid,
                        message: confirmPassword !== newPassword ? 'رمز عبور و تکرار آن یکسان نیستند' : '',
                      }
                    : undefined
                )}
              </div>
              <ErrorAlert message={error} />
              <button type="submit" disabled={loading} className={btnPrimary}>
                {loading ? 'در حال ذخیره...' : 'ذخیره رمز و ورود'}
              </button>
            </form>
          )}

          {domain && (
            <div className="mt-8 flex items-start gap-3 text-slate-500">
              <LockClosedIcon className="size-5 shrink-0 mt-0.5 text-slate-500" aria-hidden />
              <p className="text-xs text-slate-500">
                مطمئن شوید که در دامنه{' '}
                <span className="font-medium text-slate-400">{domain}</span> هستید.
              </p>
            </div>
          )}
        </main>
        </div>
      </div>
    </ClickSpark>
  )
}
