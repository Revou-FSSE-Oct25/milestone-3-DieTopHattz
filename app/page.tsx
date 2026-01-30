import { fetchProducts } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RevoShop - Product Listing',
  description: 'Browse our amazing products',
}

export default async function HomePage() {
  const products = await fetchProducts()

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="flex flex-col mb-4">
          <span className="text-5xl font-black tracking-wider text-gray-300 mb-2">
            Welcome to
          </span>
          <span className="text-5xl font-black tracking-wider text-[#e74c3c]">
            RevoShop
          </span>
        </div>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-4">
          Discover amazing products at unbeatable prices. Quality guaranteed!
        </p>
      </section>

      <section className="mb-12 p-8 rounded-xl shadow-2xl transform transition-all duration-300 relative overflow-hidden bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">🔥 Special Promotion</h2>
        <p className="text-gray-800">
          Limited time offer! Get 20% off on all electronics. Use code: <strong>REVO20</strong>
        </p>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-200">Featured Products</h2>
          <span className="text-gray-600">{products.length} products</span>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}