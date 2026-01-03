'use client'

import { BellIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import NotificationDrawer from './NotificationDrawer'

export default function TopBar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [unreadCount] = useState(3) // TODO: از API بگیرید

  return (
    <>
      <header dir="rtl" className="sticky top-0 z-40 border-b border-gray-200 bg-white rtl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">TWIN</h1>
          </div>
          <button
            type="button"
            onClick={() => setNotificationsOpen(true)}
            className="relative rounded-md p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <BellIcon className="size-6" />
            {unreadCount > 0 && (
              <span className="absolute top-1 start-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>
      <NotificationDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </>
  )
}

