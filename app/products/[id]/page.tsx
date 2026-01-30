import { fetchProductById, fetchProducts } from '@/lib/api'
import AddToCartButton from '@/components/AddToCartButton'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const products = await fetchProducts()
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const id = parseInt(resolvedParams.id)
  
  try {
    const product = await fetchProductById(id)
    return {
      title: `${product.title} - RevoShop`,
      description: product.description,
    }
  } catch {
    return {
      title: 'Product Not Found - RevoShop',
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params
  const id = parseInt(resolvedParams.id)
  
  let product
  try {
    product = await fetchProductById(id)
  } catch {
    notFound()
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="relative h-96 w-full bg-gray-50">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-200 mb-2">
              {product.title}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-4xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
              <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 font-semibold">{product.rating.rate}</span>
                <span className="ml-2 text-sm">({product.rating.count} reviews)</span>
              </div>
            </div>
            <p className="text-gray-200">{product.description}</p>
          </div>

          <div className="border-t border-b py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-200">Category</h3>
                <p className="text-gray-200 capitalize">{product.category}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-200">In Stock</h3>
                <p className="text-green-600 font-semibold">Available</p>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <AddToCartButton 
            productId={product.id}
            productName={product.title}
            productPrice={product.price}
            productImage={product.image}
          />

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Shipping Information</h3>
            <ul className="space-y-1 text-gray-800">
              <li>✓ Free shipping on orders over $50</li>
              <li>✓ Estimated delivery: 3-5 business days</li>
              <li>✓ 30-day return policy</li>
              <li>✓ Secure payment processing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}