'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const notifications = [
  {
    id: 1,
    title: 'سفارش شما با موفقیت ثبت شد',
    time: '۵ دقیقه پیش',
    read: false,
  },
  {
    id: 2,
    title: 'قیمت TWIN افزایش یافت',
    time: '۱۵ دقیقه پیش',
    read: false,
  },
  {
    id: 3,
    title: 'تراکنش شما تکمیل شد',
    time: '۱ ساعت پیش',
    read: true,
  },
]

export default function NotificationDrawer({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-x-0 bottom-0 flex max-h-full">
            <DialogPanel
              transition
              className="pointer-events-auto w-full transform transition duration-300 ease-in-out data-closed:translate-y-full"
            >
              <div dir="rtl" className="flex h-full max-h-[80vh] flex-col overflow-y-scroll rounded-t-2xl glass-nav rtl">
                <div className="px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-lg font-semibold text-gray-100">اعلان‌ها</DialogTitle>
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-lg p-2 text-gray-400 hover:text-gray-200 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all"
                    >
                      <span className="sr-only">بستن</span>
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 divide-y divide-white/5 px-4 pb-4 sm:px-6">
                  {notifications.length === 0 ? (
                    <div className="py-12 text-center">
                      <p className="text-sm text-gray-400">اعلانی ندارید</p>
                    </div>
                  ) : (
                    <ul role="list" className="divide-y divide-white/5">
                      {notifications.map((notification) => (
                        <li key={notification.id} className="py-4 hover:bg-white/5 transition-colors rounded-lg px-2">
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${notification.read ? 'text-gray-400' : 'text-gray-100'}`}>
                                {notification.title}
                              </p>
                              <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="flex-shrink-0">
                                <div className="size-2 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

