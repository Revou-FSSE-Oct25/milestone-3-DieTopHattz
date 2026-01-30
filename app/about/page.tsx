import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - RevoShop',
  description: 'Learn about RevoShop and our mission',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-200">About RevoShop</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-200">Our Mission</h2>
        <p className="text-gray-200">
          At RevoShop, we believe in revolutionizing the online shopping experience. 
          Our mission is to provide customers with high-quality products at affordable prices, 
          delivered with exceptional service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-200">Our Story</h2>
        <p className="text-gray-200">
          Founded in 2023, RevoShop started as a small project with a big vision. 
          We wanted to create an e-commerce platform that puts customers first. 
          Today, we serve thousands of happy customers worldwide.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-200">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Quality</h3>
            <p>We carefully select every product to ensure the highest standards.</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Value</h3>
            <p>Great products don't have to be expensive. We make shopping affordable.</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Service</h3>
            <p>Our customer support team is here to help you 24/7.</p>
          </div>
        </div>
      </section>
    </div>
  )
}