'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings,
  LogOut,
  FolderTree
} from 'lucide-react'
import { useAuth } from '@/app/providers/AuthProvider'

export default function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  
  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/categories', label: 'Categories', icon: FolderTree },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]
  
  return (
    <aside className="w-64 bg-[#2c3e50] text-white min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#e74c3c]">RevoShop</h2>
        <p className="text-sm text-gray-400">Admin Panel</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-[#e74c3c] text-white' 
                  : 'hover:bg-[#34495e] text-gray-300'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-red-600 text-gray-300 mt-8"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  )
}