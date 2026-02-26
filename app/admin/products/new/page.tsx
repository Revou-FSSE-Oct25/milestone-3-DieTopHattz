import ProductForm from '@/components/admin/ProductForm'

export const metadata = {
  title: 'Add New Product - RevoShop Admin',
  description: 'Add a new product to your store',
}

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#2c3e50]">Add New Product</h1>
        <p className="text-gray-600 mt-2">Fill in the details below to create a new product</p>
      </div>
      
      <ProductForm />
    </div>
  )
}