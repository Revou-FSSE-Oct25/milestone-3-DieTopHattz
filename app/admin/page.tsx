'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0
  })
  
  useEffect(() => {
    // Fetch stats
    const fetchStats = async () => {
      try {
        const productsRes = await fetch('/api/products')
        const products = await productsRes.json()
        setStats(prev => ({
          ...prev,
          totalProducts: products.length
        }))
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }
    
    fetchStats()
  }, [])
  
  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      link: '/admin/products'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-green-500',
      link: '/admin/orders'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-purple-500',
      link: '/admin/users'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      link: '/admin/orders'
    }
  ]
  
  const recentActivity = [
    { action: 'Product added', item: 'Mens Cotton Jacket', time: '2 minutes ago', user: 'Admin' },
    { action: 'Order placed', item: 'Order #12345', time: '15 minutes ago', user: 'John Doe' },
    { action: 'Product updated', item: 'Fjallraven Backpack', time: '1 hour ago', user: 'Admin' },
  ]
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-[#2c3e50]">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your store today.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.title}
              href={stat.link}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-[#2c3e50] mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-[#2c3e50] mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#e74c3c]" />
          Recent Activity
        </h2>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <p className="font-medium text-[#2c3e50]">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.item}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{activity.time}</p>
                <p className="text-xs text-gray-400">by {activity.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-[#2c3e50] mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/products/new"
            className="bg-blue-50 text-blue-700 p-4 rounded-lg hover:bg-blue-100 transition-colors text-center"
          >
            ➕ Add New Product
          </Link>
          <Link
            href="/admin/orders"
            className="bg-green-50 text-green-700 p-4 rounded-lg hover:bg-green-100 transition-colors text-center"
          >
            📦 View Orders
          </Link>
          <Link
            href="/admin/categories"
            className="bg-purple-50 text-purple-700 p-4 rounded-lg hover:bg-purple-100 transition-colors text-center"
          >
            🏷️ Manage Categories
          </Link>
        </div>
      </div>
    </div>
  )
}