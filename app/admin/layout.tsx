'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/providers/AuthProvider'
import AdminSidebar from '@/components/admin/sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkAdmin = async () => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push('/login?redirect=/admin')
          return
        }
        
        // Check if user is admin
        if (user?.role !== 'admin') {
          router.push('/')
          return
        }
        
        // Verify with API
        try {
          const response = await fetch('/api/admin/verify')
          if (response.ok) {
            setIsAdmin(true)
          } else {
            router.push('/')
          }
        } catch (error) {
          router.push('/')
        } finally {
          setChecking(false)
        }
      }
    }
    
    checkAdmin()
  }, [isLoading, isAuthenticated, user, router])

  if (isLoading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e74c3c] mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}