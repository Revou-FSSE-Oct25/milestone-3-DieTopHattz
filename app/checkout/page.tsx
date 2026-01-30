'use client'

import { useState } from 'react'
import { useCart } from '@/app/providers/CartProvider'
import { useRouter } from 'next/navigation'
import { useToast } from '@/app/providers/ToastProvider'
import { CreditCard, Package, Truck, ShieldCheck, ArrowLeft, CheckCircle, Clock, Wallet, MapPin } from 'lucide-react'
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaCcApplePay } from 'react-icons/fa'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const { showToast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState(1)
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'US',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveInfo: false
  })

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateShipping = () => {
    return calculateSubtotal() > 50 ? 0 : 5.99
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.08
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success
    showToast('Order placed successfully! Thank you for your purchase.', 'success')
    
    // Clear cart
    clearCart()
    
    // Redirect to confirmation
    router.push('/checkout/success')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <Package className="h-12 w-12 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-200 mb-4">Your cart is empty</h1>
        <p className="text-gray-200 mb-8">Looks like you haven't added any items to your cart yet.</p>

        <Link 
        href="/"
        className="bg-[#e74c3c] text-white py-2 px-6 rounded-lg font-semibold hover:bg-[#c0392b] transition-colors flex items-center justify-center gap-2 w-50 mx-auto"
        >
        <ArrowLeft className="h-4 w-4" />
        Back to Shopping
        </Link>
            </div>
            )
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
        <p className="text-gray-600">Complete your purchase in just a few steps</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between py-4">
          {['Shipping', 'Payment', 'Review'].map((title, index) => (
            <div key={title} className="flex items-center mb-4 md:mb-0">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                ${step > index + 1 ? 'bg-green-500 text-white' : 
                  step === index + 1 ? 'bg-[#e74c3c] text-white' : 
                  'bg-gray-200 text-gray-200'}
                font-semibold text-lg
              `}>
                {step > index + 1 ? <CheckCircle className="h-6 w-6" /> : index + 1}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-200">Step {index + 1}</p>
                <p className="font-semibold text-lg text-gray-200">{title}</p>
              </div>
              {index < 2 && (
                <div className={`
                  hidden md:block w-24 h-1 mx-8
                  ${step > index + 1 ? 'bg-green-500' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-rows-2 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmitOrder} className="bg-white rounded-xl shadow-lg p-6">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-[#2c3e50] mb-6">
                  Shipping Information
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent"
                      placeholder="123 Main St"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <select
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#e74c3c] rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Save this information for next time
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Details */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-[#2c3e50] mb-6">
                  Payment Details
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      required
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        required
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        required
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="saveCard"
                      className="h-4 w-4 text-[#e74c3c] rounded"
                    />
                    <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
                      Save card for future purchases
                    </label>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <ShieldCheck className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                      <p className="text-sm text-blue-800">
                        Your payment information is secured with 256-bit SSL encryption. We never store your full card details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-[#2c3e50] mb-6">
                  Review Your Order
                </h2>
                
                <div className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-[#2c3e50] mb-4 flex items-center gap-2">
                      <Package className="h-5 w-5 text-[#e74c3c]" />
                      Order Summary
                    </h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg mr-3 flex items-center justify-center">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="max-h-full max-w-full object-contain p-1"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-semibold text-[#e74c3c]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-medium">
                            {calculateShipping() === 0 ? (
                              <span className="text-green-600">Free</span>
                            ) : (
                              `$${calculateShipping().toFixed(2)}`
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax (8%)</span>
                          <span className="font-medium">
                            ${calculateTax().toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-2 border-t">
                          <span>Total</span>
                          <span className="text-[#e74c3c]">
                            ${calculateTotal().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Shipping Information Review */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-[#2c3e50] mb-3 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-[#e74c3c]" />
                      Shipping Information
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Address:</span> {formData.address}, {formData.city}, {formData.zipCode}, {formData.country}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Email:</span> {formData.email}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Phone:</span> {formData.phone}
                      </p>
                    </div>
                  </div>
                  
                  {/* Payment Information Review */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-[#2c3e50] mb-3 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-[#e74c3c]" />
                      Payment Method
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Card:</span> **** **** **** {formData.cardNumber.slice(-4)}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Name on Card:</span> {formData.cardName}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Expiry:</span> {formData.expiryDate}
                      </p>
                    </div>
                  </div>
                  
                  {/* Delivery Estimate */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Delivery Estimate</h4>
                        <p className="text-sm text-blue-700">
                          Your order will be delivered within 3-5 business days after processing.
                          You will receive a tracking number via email once your order ships.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-[#2c3e50] mb-3">Terms & Conditions</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="terms"
                          required
                          className="h-4 w-4 text-[#e74c3c] rounded mt-1 flex-shrink-0"
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                          I agree to the <a href="#" className="text-[#e74c3c] hover:underline">Terms of Service</a> and <a href="#" className="text-[#e74c3c] hover:underline">Privacy Policy</a>
                        </label>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="refund"
                          required
                          className="h-4 w-4 text-[#e74c3c] rounded mt-1 flex-shrink-0"
                        />
                        <label htmlFor="refund" className="ml-2 text-sm text-gray-700">
                          I understand that digital products are non-refundable once downloaded
                        </label>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="communication"
                          required
                          className="h-4 w-4 text-[#e74c3c] rounded mt-1 flex-shrink-0"
                        />
                        <label htmlFor="communication" className="ml-2 text-sm text-gray-700">
                          I agree to receive order updates and promotional communications via email
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between mt-8 pt-6 border-t gap-4">
              <div>
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-full sm:w-auto px-6 py-3 border border-[#2c3e50] text-[#2c3e50] rounded-lg font-medium hover:bg-[#2c3e50] hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Previous Step
                  </button>
                ) : (
                  <Link
                    href="/cart"
                    className="w-full sm:w-auto px-6 py-3 border border-[#2c3e50] text-[#2c3e50] rounded-lg font-medium hover:bg-[#2c3e50] hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Cart
                  </Link>
                )}
              </div>
              
              <div>
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full sm:w-auto px-8 py-3 bg-[#e74c3c] text-white rounded-lg font-medium hover:bg-[#c0392b] transition-colors"
                  >
                    Continue to {step === 1 ? 'Payment' : 'Review'}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-8 py-3 bg-[#e74c3c] text-white rounded-lg font-medium hover:bg-[#c0392b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing Order...
                      </>
                    ) : (
                      <>
                        <Wallet className="h-5 w-5" />
                        Place Order & Pay ${calculateTotal().toFixed(2)}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-[#2c3e50] mb-6">Order Summary</h2>
            
            {/* Order Items Preview */}
            <div className="mb-6">
              <h3 className="font-medium text-[#2c3e50] mb-3">Items ({items.length})</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg mr-3 flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {calculateShipping() === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${calculateShipping().toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-medium">
                  ${calculateTax().toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[#e74c3c]">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Shipping Info */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium text-[#2c3e50]">Shipping</h4>
              </div>
              <p className="text-sm text-gray-600">
                {calculateShipping() === 0 
                  ? "Free shipping applied"
                  : "Standard shipping: $5.99"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Estimated delivery: 3-5 business days
              </p>
            </div>
            
            {/* Current Step Help */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-[#2c3e50] mb-2">Current Step: {
                step === 1 ? 'Shipping Information' :
                step === 2 ? 'Payment Details' :
                'Review Order'
              }</h4>
              <p className="text-sm text-gray-600">
                {step === 1 ? 'Enter your shipping details to proceed' :
                 step === 2 ? 'Enter your payment information securely' :
                 'Review your order before placing it'}
              </p>
            </div>
            
            {/* Security Badge */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-green-800">Secure Checkout</p>
                  <p className="text-xs text-green-700">Your information is protected</p>
                </div>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-gray-600 mb-3">We accept:</p>
              <div className="flex space-x-2">
                <FaCcVisa className="h-6 w-8 text-blue-900" />
                <FaCcMastercard className="h-6 w-8 text-red-600" />
                <FaCcPaypal className="h-6 w-8 text-blue-500" />
                <FaCcAmex className="h-6 w-8 text-blue-600" />
                <FaCcApplePay className="h-6 w-8 text-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-[#2c3e50]">Free Returns</h4>
              <p className="text-sm text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-[#2c3e50]">Secure Payment</h4>
              <p className="text-sm text-gray-600">SSL encryption</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Truck className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-[#2c3e50]">Fast Delivery</h4>
              <p className="text-sm text-gray-600">3-5 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}