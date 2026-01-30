'use client'

import Link from 'next/link'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '@/app/providers/CartProvider'
import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
  const { totalItems, items, removeFromCart, updateQuantity } = useCart()
  const [showCartPreview, setShowCartPreview] = useState(false)

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

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
          
          {/* Cart Button */}
          <div className="flex items-center space-x-4 relative">
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

            {/* Cart Preview Dropdown */}
            {showCartPreview && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                <div className="p-4 max-h-[70vh] overflow-y-auto">
                  <h3 className="font-bold text-lg text-[#2c3e50] mb-4 flex justify-between items-center">
                    <span>Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                    <button 
                      onClick={() => setShowCartPreview(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </h3>
                  
                  {items.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <ShoppingCart className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>Your cart is empty</p>
                      <Link 
                        href="/"
                        className="mt-4 inline-block bg-[#2c3e50] text-white py-2 px-4 rounded-lg hover:bg-[#34495e] transition-colors"
                        onClick={() => setShowCartPreview(false)}
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3 border-b pb-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="max-h-full max-w-full object-contain p-1"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium text-[#2c3e50] line-clamp-1 text-sm">
                                {item.title}
                              </h4>
                              <p className="text-[#e74c3c] font-bold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="text-sm font-medium">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-auto text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold text-[#2c3e50]">Total:</span>
                          <span className="text-xl font-bold text-[#e74c3c]">
                            ${calculateTotal().toFixed(2)}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Link 
                            href="/cart"
                            className="flex-1 bg-[#2c3e50] text-white py-3 rounded-lg text-center font-medium hover:bg-[#34495e] transition-colors"
                            onClick={() => setShowCartPreview(false)}
                          >
                            View Cart
                          </Link>
                          <button className="flex-1 bg-[#e74c3c] text-white py-3 rounded-lg font-medium hover:bg-[#c0392b] transition-colors">
                            Checkout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}