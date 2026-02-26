'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, RefreshCw } from 'lucide-react'
import ProductTable from '@/components/admin/ProductTable'
import { useToast } from '@/app/providers/ToastProvider'

export default function AdminProductsPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    fetchProducts()
  }, [])
  
  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      showToast('Failed to fetch products', 'error')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        showToast('Product deleted successfully', 'success')
        fetchProducts() // Refresh list
        router.refresh() // Trigger ISR
      } else {
        showToast('Failed to delete product', 'error')
      }
    } catch (error) {
      showToast('Failed to delete product', 'error')
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2c3e50]">Products</h1>
          <p className="text-gray-600 mt-2">Manage your product inventory</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={fetchProducts}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            Refresh
          </button>
          
          <Link
            href="/admin/products/new"
            className="bg-[#e74c3c] text-white px-4 py-2 rounded-lg hover:bg-[#c0392b] transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Product
          </Link>
        </div>
      </div>
      
      {/* Product Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e74c3c] mx-auto"></div>
        </div>
      ) : (
        <ProductTable products={products} onDelete={handleDelete} />
      )}
    </div>
  )
}