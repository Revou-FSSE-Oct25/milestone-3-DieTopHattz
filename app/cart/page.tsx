'use client'

import { useCart } from '@/app/providers/CartProvider'
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, Package, Truck, Shield, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function CartPage() {
  const { items, totalItems, removeFromCart, updateQuantity, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateShipping = () => {
    return calculateSubtotal() > 50 ? 0 : 5.99
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.08
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax()
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="h-12 w-12 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-200 mb-4">Your cart is empty</h1>
        <p className="text-gray-200 mb-8">Looks like you haven't added any items to your cart yet.</p>

        <Link 
        href="/"
        className="bg-[#e74c3c] text-white py-2 px-6 rounded-lg font-semibold hover:bg-[#c0392b] transition-colors flex items-center justify-center gap-2 w-50 mx-auto"
        >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
        </Link>
            </div>
            )
        }

  return (
    <div className="max-w-7xl mx-auto px-4">
        <div className='flex flex-col flex-start gap-1'>
            <h1 className="text-3xl font-bold text-gray-200 mb-2">Shopping Cart</h1>
            <p className="text-gray-200 mb-2">Review your items and proceed to checkout</p>
        </div>
      
      <div className="grid grid-rows-2 gap-8">
        {/* Cart Items */}
          <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#2c3e50]">
                Your Items ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </h2>
              <button 
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 hover:scale-105 transition-transform"
              >
                <Trash2 className="h-4 w-4" />
                Clear Cart
              </button>
            </div>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex flex-row sm:flex-row items-start sm:items-center gap-4 border-b pb-4 last:border-0 group">
                  {/* Image Container - Fixed size */}
                  <div className="w-full sm:w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                      style={{ maxWidth: '55%', maxHeight: '55%' }}
                    />
                  </div>
                  
                  <div className="flex-grow w-full">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      {/* Product Info */}
                      <div className="flex-grow">
                        <Link href={`/products/${item.id}`}>
                          <h3 className="font-semibold text-[#2c3e50] hover:text-[#e74c3c] transition-colors line-clamp-2 text-sm sm:text-base">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm mt-1">
                          Unit Price: <span className="font-medium">${item.price.toFixed(2)}</span>
                        </p>
                        
                        {/* Mobile quantity controls */}
                        <div className="flex items-center justify-between mt-3 sm:hidden">
                          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-md hover:bg-gray-100 shadow-sm"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-medium w-6 text-center text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-md hover:bg-gray-100 shadow-sm"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold text-[#e74c3c]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Desktop quantity controls and price */}
                      <div className="hidden sm:flex flex-row items-end gap-3">
                        <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-100 shadow-sm"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-100 shadow-sm"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xl font-bold text-[#e74c3c]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm mt-1 flex items-center gap-1 hover:scale-105 transition-transform"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile remove button */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="mt-3 sm:hidden text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>       



        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 sticky">
            <h2 className="text-xl font-semibold text-[#2c3e50] mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {calculateShipping() === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${calculateShipping().toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-medium">
                  ${calculateTax().toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[#e74c3c]">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                {calculateShipping() === 0 && (
                  <p className="text-sm text-green-600 mt-1 text-right">
                    🎉 You saved $5.99 on shipping!
                  </p>
                )}
              </div>
            </div>
            
            {/* Promo Code */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Promo Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-grow border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent"
                />
                <button className="bg-[#2c3e50] text-white px-3 py-2 rounded-r-lg hover:bg-[#34495e] transition-colors text-sm">
                  Apply
                </button>
              </div>
            </div>

            <div className = "flex flex-col gap-2">
            <Link
              href="/checkout"
              className="w-full bg-[#e74c3c] text-white py-3 rounded-lg font-semibold hover:bg-[#c0392b] transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Proceed to Checkout
            </Link>
            
            <Link 
              href="/"
              className="w-full bg-white border border-[#2c3e50] text-[#2c3e50] py-2 rounded-lg font-medium hover:bg-[#2c3e50] hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}