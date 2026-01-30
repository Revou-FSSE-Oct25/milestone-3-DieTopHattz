'use client'

import Link from 'next/link'
import { Product } from '@/lib/api'
import { useCart } from '@/app/providers/CartProvider'
import { useToast } from '@/app/providers/ToastProvider'
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation to product page
    e.stopPropagation()
    
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    })
    
    // Show toast notification
    showToast(
      `Added ${product.title} to cart!`,
      'success'
    )
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group cursor-pointer h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gray-100">
        {/* Image container */}
        <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
            {product.title}
          </h3>
          <div className="mt-auto">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-gray-600">
                  {product.rating.rate} ({product.rating.count})
                </span>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full mt-3 bg-[#e74c3c] text-white py-2 rounded-lg font-medium hover:bg-[#c0392b] transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}