'use client'

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { isAuthenticated, removeToken } from '@/lib/utils'

const navigation = [
  { name: 'معامله', href: '/trade' },
  { name: 'قیمت', href: '#' },
  { name: 'درباره ما', href: '#' },
]

const btnClass =
  'group relative rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-300 hover:scale-105'
const btnClassMobile =
  'group relative rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 transition-all duration-300 hover:scale-105'

export default function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const desktopDropdownRef = useRef(null)
  const mobileDropdownRef = useRef(null)
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(isAuthenticated())
  }, [])

  useEffect(() => {
    if (!dropdownOpen) return
    const handleClickOutside = (e) => {
      const inside =
        desktopDropdownRef.current?.contains(e.target) || mobileDropdownRef.current?.contains(e.target)
      if (!inside) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  const handleLogout = () => {
    removeToken()
    setIsLoggedIn(false)
    setDropdownOpen(false)
    setMobileMenuOpen(false)
    router.push('/home')
  }

  return (
    <header dir="rtl" className="rtl fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <nav
          aria-label="Global"
          className="flex items-center justify-between rounded-2xl glass-nav px-4 py-3 sm:px-6 lg:px-8 lg:py-4 shadow-xl border border-white/10"
        >
        {/* موبایل: همبرگر + لوگو */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:text-white transition-colors"
          >
            <span className="sr-only">باز کردن منو</span>
            <Bars3Icon aria-hidden="true" className="size-5" />
          </button>
                <Link href="/home" className="group">
            <span className="sr-only">صرافی TWIN</span>
            <span className="text-xl font-bold text-white bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent group-hover:from-primary-300 group-hover:to-primary-400 transition-all duration-300">
              TWIN
            </span>
          </Link>
        </div>

        {/* دسکتاپ: ساختار با لوگو، منو در وسط، و دکمه */}
        <div className="hidden lg:flex lg:items-center lg:flex-1 lg:justify-between">
          {/* لوگو */}
          <div className="flex-1">
            <Link href="/home" className="-m-1.5 p-1.5 group inline-block">
              <span className="sr-only">صرافی TWIN</span>
              <span className="text-2xl font-bold text-white bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent group-hover:from-primary-300 group-hover:to-primary-400 transition-all duration-300">
                TWIN
              </span>
            </Link>
          </div>

          {/* منو در وسط */}
          <div className="flex items-center justify-center gap-x-12 flex-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-300 hover:text-white transition-all duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 start-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* دسکتاپ: دکمه ورود یا منوی پروفایل */}
          <div className="flex items-center justify-end flex-1">
            {isLoggedIn ? (
              <div
                ref={desktopDropdownRef}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={btnClass}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <UserCircleIcon className="size-5" />
                    پروفایل
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                {dropdownOpen && (
                  <div className="absolute end-0 top-full z-50 mt-2 min-w-[180px] rounded-xl border border-white/10 bg-slate-800/95 py-2 shadow-xl backdrop-blur">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <UserCircleIcon className="size-5 shrink-0" />
                      پروفایل
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-start text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="size-5 shrink-0" />
                      خروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className={btnClass}>
                <span className="relative z-10">ورود / ثبت‌نام</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            )}
          </div>
        </div>

        {/* موبایل: دکمه ورود یا منوی پروفایل */}
        <div className="flex items-center lg:hidden">
          {isLoggedIn ? (
            <div className="relative" ref={mobileDropdownRef}>
              <button
                type="button"
                className={btnClassMobile}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                  <UserCircleIcon className="size-4" />
                  پروفایل
                </span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              {dropdownOpen && (
                <div className="absolute end-0 top-full z-50 mt-2 min-w-[160px] rounded-xl border border-white/10 bg-slate-800/95 py-2 shadow-xl backdrop-blur">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                    onClick={() => { setDropdownOpen(false); setMobileMenuOpen(false) }}
                  >
                    <UserCircleIcon className="size-5 shrink-0" />
                    پروفایل
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-start text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="size-5 shrink-0" />
                    خروج
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className={btnClassMobile}>
              <span className="relative z-10 whitespace-nowrap">ورود / ثبت‌نام</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          )}
        </div>
        </nav>
      </div>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 start-0 z-50 w-full overflow-y-auto bg-slate-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">صرافی TWIN</span>
              <span className="text-2xl font-bold text-white">TWIN</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-300"
            >
              <span className="sr-only">بستن منو</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserCircleIcon className="size-5 shrink-0" />
                      پروفایل
                    </Link>
                    <button
                      type="button"
                      onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                      className="-mx-3 mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="size-5 shrink-0" />
                      خروج
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ورود / ثبت‌نام
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
