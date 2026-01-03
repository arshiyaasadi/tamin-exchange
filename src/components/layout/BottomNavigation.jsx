'use client'

import { HomeIcon, ChartBarIcon, UserIcon } from '@heroicons/react/24/outline'
import { HomeIcon as HomeIconSolid, ChartBarIcon as ChartBarIconSolid, UserIcon as UserIconSolid } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'خانه', href: '/', icon: HomeIcon, iconSolid: HomeIconSolid },
  { name: 'معامله', href: '/trade', icon: ChartBarIcon, iconSolid: ChartBarIconSolid },
  { name: 'پروفایل', href: '/profile', icon: UserIcon, iconSolid: UserIconSolid },
]

export default function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav dir="rtl" className="fixed bottom-0 start-0 end-0 z-50 border-t border-gray-200 bg-white rtl">
      <div className="flex h-16 items-center justify-around">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = isActive ? item.iconSolid : item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center px-4 py-2 transition-colors ${
                isActive ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="size-6" />
              <span className="mt-1 text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

