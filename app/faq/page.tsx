import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - RevoShop',
  description: 'Frequently asked questions about RevoShop',
}

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Simply browse our products, add items to your cart, and proceed to checkout. You can pay using various payment methods including credit cards and PayPal.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unused products in their original packaging. Contact our support team to initiate a return.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Shipping typically takes 3-5 business days within the US. International shipping may take 7-14 business days.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order ships, you will receive a tracking number via email. You can use this to track your package on our website.',
  },
  {
    question: 'Are my payments secure?',
    answer: 'Yes, we use industry-standard SSL encryption to protect your payment information. We never store your credit card details on our servers.',
  },
]

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-200">Frequently Asked Questions</h1>
      
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-200 border rounded-lg p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {faq.question}
            </h3>
            <p className="text-gray-800">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-200 p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-gray-800 mb-4">
          Our customer support team is here to help you!
        </p>
        <a 
          href="mailto:support@revoshop.com" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Contact Support
        </a>
      </div>
    </div>
  )
}