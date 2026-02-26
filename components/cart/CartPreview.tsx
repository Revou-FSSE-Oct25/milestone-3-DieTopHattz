'use client'

import { useCartStore } from '@/app/store/cartStore'
import { useAuth } from '@/app/providers/AuthProvider'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface CartPreviewProps {
  onClose: () => void
}

export default function CartPreview({ onClose }: CartPreviewProps) {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  
  // Get state and actions from store
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  
  // Get computed values
  const totalItems = useCartStore((state) => state.getTotalItems())
  const subtotal = useCartStore((state) => state.getSubtotal())
  const shipping = useCartStore((state) => state.getShipping())
  const total = useCartStore((state) => state.getTotal())

  const handleCheckoutClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClose()
    
    console.log('Checkout clicked - Auth state:', { isAuthenticated, user })
    
    // DIRECT NAVIGATION - no auth check here
    // Let the checkout page handle the auth check
    router.push('/checkout')
  }

  const handleViewCartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClose()
    router.push('/cart')
  }

  if (items.length === 0) {
    return (
      <div className="w-80 bg-white rounded-lg shadow-xl border">
        <div className="p-6 text-center">
          <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            href="/"
            className="inline-block bg-[#e74c3c] text-white px-4 py-2 rounded-lg hover:bg-[#c0392b] transition-colors"
            onClick={onClose}
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 bg-white rounded-lg shadow-xl border">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="font-bold text-lg text-[#2c3e50]">
          Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </h3>
        {user && (
          <p className="text-xs text-green-600 mt-1">
            ✓ Logged in as: {user.name}
          </p>
        )}
      </div>

      {/* Cart Items */}
      <div className="max-h-96 overflow-y-auto p-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 border-b pb-3 last:border-0">
            {/* Product Image */}
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-full max-w-full object-contain p-1"
              />
            </div>

            {/* Product Details */}
            <div className="flex-grow">
              <Link 
                href={`/products/${item.id}`}
                className="font-medium text-sm text-[#2c3e50] hover:text-[#e74c3c] transition-colors line-clamp-2"
                onClick={onClose}
              >
                {item.title}
              </Link>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      updateQuantity(item.id, item.quantity - 1)
                    }}
                    className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      updateQuantity(item.id, item.quantity + 1)
                    }}
                    className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#e74c3c]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      removeItem(item.id)
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 border-t bg-gray-50">
        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping:</span>
            <span className="font-medium">
              {shipping === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span className="text-[#e74c3c]">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleViewCartClick}
            className="flex-1 bg-[#2c3e50] text-white py-2 rounded-lg text-center text-sm font-medium hover:bg-[#34495e] transition-colors"
          >
            View Cart
          </button>
          <button
            onClick={handleCheckoutClick}
            className="flex-1 bg-[#e74c3c] text-white py-2 rounded-lg text-center text-sm font-medium hover:bg-[#c0392b] transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}