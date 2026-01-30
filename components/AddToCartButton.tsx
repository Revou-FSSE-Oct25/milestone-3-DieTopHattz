'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/app/providers/CartProvider'
import { useToast } from '@/app/providers/ToastProvider'

interface AddToCartButtonProps {
  productId: number
  productName: string
  productPrice: number
  productImage: string
}

export default function AddToCartButton({ 
  productId, 
  productName, 
  productPrice,
  productImage
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    // Add all items at once with quantity
    addToCart({
      id: productId,
      title: productName,
      price: productPrice,
      image: productImage
    })
    
    // Show success feedback using toast
    showToast(
      `Added ${quantity} ${productName}${quantity > 1 ? '(s)' : ''} to cart!`,
      'success'
    )
    
    // Reset
    setIsAdding(false)
    setQuantity(1)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="font-medium text-gray-200">Quantity:</label>
        <div className="flex items-center border border-[#bdc3c7] rounded-lg">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-3 py-2 hover:bg-gray-100 rounded-l-lg transition-colors text-gray-200"
            disabled={isAdding}
          >
            -
          </button>
          <span className="px-4 py-2 min-w-[3rem] text-center border-x border-[#bdc3c7] text-gray-200">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="px-3 py-2 hover:bg-gray-100 rounded-r-lg transition-colors text-gray-200"
            disabled={isAdding}
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full bg-[#e74c3c] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#c0392b] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        {isAdding ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Adding to Cart...</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            <span>Add {quantity} to Cart</span>
          </>
        )}
      </button>
    </div>
  )
}