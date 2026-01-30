'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Package, Truck, Home, ShoppingBag, Download, Share2, Clock } from 'lucide-react'

export default function CheckoutSuccessPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [estimatedDelivery, setEstimatedDelivery] = useState('')
  
  useEffect(() => {
    // Generate random order number
    const randomId = Math.floor(100000 + Math.random() * 900000)
    setOrderNumber(`REVO-${randomId}`)
    
    // Calculate delivery date (3-5 business days from now)
    const today = new Date()
    const deliveryDate = new Date(today)
    deliveryDate.setDate(today.getDate() + 4) // 4 days from now (approx 3-5 business days)
    
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    }
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', options))
    
    // Clear cart items from localStorage
    localStorage.removeItem('cart-items')
  }, [])

  const handlePrintReceipt = () => {
    window.print()
  }

  const handleShareOrder = () => {
    if (navigator.share) {
      navigator.share({
        title: `My RevoShop Order #${orderNumber}`,
        text: `I just placed an order on RevoShop! Order #${orderNumber}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Order link copied to clipboard!')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-200 mb-3">Order Confirmed!</h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Thank you for your purchase. Your order has been successfully placed and is being processed.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">Order Details</h2>
            <p className="text-gray-600">We've sent a confirmation email with your receipt.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 text-sm mb-1">Order Number</p>
              <p className="text-2xl font-bold text-[#e74c3c]">{orderNumber}</p>
            </div>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#2c3e50] mb-6">Order Status</h3>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
            {[
              { icon: <CheckCircle className="h-6 w-6" />, title: 'Order Placed', status: 'Completed', time: 'Just now', color: 'text-green-500', bg: 'bg-green-100' },
              { icon: <Package className="h-6 w-6" />, title: 'Processing', status: 'In Progress', time: 'Next 24 hours', color: 'text-blue-500', bg: 'bg-blue-100' },
              { icon: <Truck className="h-6 w-6" />, title: 'Shipped', status: 'Pending', time: estimatedDelivery, color: 'text-orange-500', bg: 'bg-orange-100' },
              { icon: <CheckCircle className="h-6 w-6" />, title: 'Delivered', status: 'Pending', time: 'Estimated', color: 'text-gray-400', bg: 'bg-gray-100' },
            ].map((step, index) => (
              <div key={step.title} className="flex items-center md:block text-center md:text-left">
                <div className={`${step.bg} ${step.color} w-12 h-12 rounded-full flex items-center justify-center mr-4 md:mx-auto md:mb-3`}>
                  {step.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-[#2c3e50]">{step.title}</h4>
                  <p className={`text-sm font-medium ${step.status === 'Completed' ? 'text-green-600' : step.status === 'In Progress' ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step.status}
                  </p>
                  <p className="text-xs text-gray-500">{step.time}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gray-200 mt-6"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <div className="flex items-start">
            <Truck className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Delivery Information</h4>
              <p className="text-blue-700 mb-2">
                Your order will be delivered by <strong>{estimatedDelivery}</strong>
              </p>
              <p className="text-sm text-blue-600">
                You'll receive a tracking number via email once your order ships. 
                Most orders are delivered within 3-5 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div>
          <h3 className="text-lg font-semibold text-[#2c3e50] mb-4">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <h4 className="font-medium text-[#2c3e50]">Order Confirmation</h4>
              </div>
              <p className="text-sm text-gray-600">
                Check your email for order confirmation and receipt. 
                Spam folder too.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <h4 className="font-medium text-[#2c3e50]">Shipping Updates</h4>
              </div>
              <p className="text-sm text-gray-600">
                We'll notify you when your order ships and provide tracking information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 py-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/"
          className="bg-[#e74c3c] text-white py-4 rounded-lg font-semibold hover:bg-[#c0392b] transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Home className="h-5 w-5" />
          Back to Home
        </Link>
        
        <Link
          href="/"
          className="bg-white border-2 border-[#2c3e50] text-[#2c3e50] py-4 rounded-lg font-semibold hover:bg-[#2c3e50] hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag className="h-5 w-5" />
          Continue Shopping
        </Link>
        
        <button
          onClick={handlePrintReceipt}
          className="bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="h-5 w-5" />
          Print Receipt
        </button>
        
        <button
          onClick={handleShareOrder}
          className="bg-white border-2 border-blue-500 text-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
        >
          <Share2 className="h-5 w-5" />
          Share Order
        </button>
      </div>

      {/* Support Section */}
      <div className="bg-gradient-to-r from-[#2c3e50] to-[#34495e] rounded-2xl p-8 text-white">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Need Help with Your Order?</h3>
          <p className="text-gray-300 mb-6">
            Our customer support team is here to help you with any questions about your order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@revoshop.com"
              className="bg-white text-[#2c3e50] py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Email Support
            </a>
            <a
              href="tel:+11234567890"
              className="bg-transparent border-2 border-white text-white py-3 px-6 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Call: (123) 456-7890
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Support hours: Monday-Friday, 9AM-6PM EST
          </p>
        </div>
      </div>

      {/* Order FAQ */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-[#2c3e50] mb-6 text-center">Order FAQs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "When will my order ship?",
              answer: "Most orders ship within 24 hours. You'll receive a tracking number via email once shipped."
            },
            {
              question: "Can I modify or cancel my order?",
              answer: "Orders can be modified or cancelled within 1 hour of placement. Contact support immediately."
            },
            {
              question: "What's your return policy?",
              answer: "We offer a 30-day return policy for unused items in original packaging. See full policy on our website."
            },
            {
              question: "How can I track my order?",
              answer: "Use the tracking number sent to your email or check your account dashboard for real-time updates."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-[#2c3e50] mb-2">{faq.question}</h4>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          nav, footer, button, a {
            display: none !important;
          }
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .print-only {
            display: block !important;
          }
        }
      `}</style>
    </div>
  )
}