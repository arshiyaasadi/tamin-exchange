'use client'

export default function Error({ error, reset }) {
  return (
    <div dir="rtl" className="flex min-h-screen flex-col items-center justify-center bg-slate-900 rtl">
      <div className="text-gray-400">خطایی رخ داد</div>
      <button
        onClick={reset}
        className="mt-4 rounded-xl bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
      >
        تلاش مجدد
      </button>
    </div>
  )
}
