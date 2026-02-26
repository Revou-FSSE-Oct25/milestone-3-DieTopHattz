'use client'

import Link from 'next/link'
import { ShoppingCart, User, LogOut } from 'lucide-react'
import { useAuth } from '@/app/providers/AuthProvider'
import { useCartStore } from '@/app/store/cartStore'
import { useState } from 'react'
import CartPreview from '@/components/cart/CartPreview'

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const totalItems = useCartStore((state) => state.getTotalItems())
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCartPreview, setShowCartPreview] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#2c3e50]/95 backdrop-blur-sm border-b border-[#ecf0f1]/10">
      <nav className="container mx-auto px-4 py-5">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-black tracking-wider text-[#e74c3c]">
                RevoShop
              </span>
              <span className="text-[11px] text-[#bdc3c7] tracking-wider mt-0.5">
                PREMIUM E-COMMERCE
              </span>
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-10">
              <Link 
                href="/" 
                className="relative text-[#ecf0f1] text-[15px] font-medium transition-all duration-300 hover:text-[#e74c3c] group"
              >
                Home
                <span className="absolute bottom-[-5px] left-0 w-0 h-0.5 bg-[#e74c3c] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/about" 
                className="relative text-[#ecf0f1] text-[15px] font-medium transition-all duration-300 hover:text-[#e74c3c] group"
              >
                About
                <span className="absolute bottom-[-5px] left-0 w-0 h-0.5 bg-[#e74c3c] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/faq" 
                className="relative text-[#ecf0f1] text-[15px] font-medium transition-all duration-300 hover:text-[#e74c3c] group"
              >
                FAQ
                <span className="absolute bottom-[-5px] left-0 w-0 h-0.5 bg-[#e74c3c] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-[#ecf0f1] hover:text-[#e74c3c] transition-colors"
                >
                  <div className="w-8 h-8 bg-[#e74c3c] rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden md:block">{user?.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    {user?.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Orders
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        logout()
                        setShowUserMenu(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-[#ecf0f1] hover:text-[#e74c3c] transition-colors font-medium"
              >
                Login
              </Link>
            )}

            {/* Cart Button */}
            <div className="relative">
              <button 
                className="relative bg-[#e74c3c] border-none text-white py-3 px-6 rounded-full cursor-pointer text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:bg-[#c0392b] hover:translate-y-[-2px] hover:shadow-[0_5px_15px_rgba(231,76,60,0.4)]"
                onClick={() => setShowCartPreview(!showCartPreview)}
              >
                <ShoppingCart className="h-5 w-5" />
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-[#e74c3c] text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold border-2 border-[#2c3e50]">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>

              {/* Cart Preview */}
              {showCartPreview && (
                <div className="absolute top-full right-0 mt-2 z-50">
                  <CartPreview onClose={() => setShowCartPreview(false)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}