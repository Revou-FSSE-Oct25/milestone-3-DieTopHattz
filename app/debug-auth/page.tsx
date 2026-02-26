'use client'

import { useAuth } from '@/app/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DebugAuthPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('Debug Page - Auth State:', { user, isAuthenticated, isLoading })
  }, [user, isAuthenticated, isLoading])

  const checkCookie = () => {
    console.log('Document cookie:', document.cookie)
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Auth Debug Page</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Auth State:</h2>
        <pre className="bg-white p-4 rounded border overflow-auto">
          {JSON.stringify({ user, isAuthenticated, isLoading }, null, 2)}
        </pre>
      </div>

      <div className="space-y-4">
        <button
          onClick={checkCookie}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Check Cookies
        </button>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
        >
          Logout
        </button>

        <button
          onClick={() => router.push('/checkout')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4"
        >
          Go to Checkout
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Instructions:</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Login first (if not logged in)</li>
          <li>Come back to this page</li>
          <li>Check if user object appears above</li>
          <li>Check cookies in browser console</li>
          <li>Try going to checkout from here</li>
        </ol>
      </div>
    </div>
  )
}