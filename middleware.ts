import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/api/auth'
import { JWT_SECRET } from './lib/constants'

const publicRoutes = [
  '/',
  '/products',
  '/about',
  '/faq',
  '/login',
  '/register',
  '/debug-auth',
]

const publicPrefixes = [
  '/products/',
  '/api/products',
  '/api/auth',
]

const protectedRoutes = [
  '/checkout',
  '/profile',
  '/orders',
  '/cart',
]

// Add admin routes
const adminRoutes = [
  '/admin',
  '/admin/(.*)',
  '/api/admin/(.*)'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  console.log('\n=== MIDDLEWARE DEBUG ===')
  console.log('📍 Path:', pathname)
  
  // Allow all API auth routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }
  
  // Check if route is public
  const isPublicRoute = publicRoutes.includes(pathname) || 
    publicPrefixes.some(prefix => pathname.startsWith(prefix))
  
  if (isPublicRoute) {
    return NextResponse.next()
  }
  
  // Check if route is admin
  const isAdminRoute = adminRoutes.some(route => {
    if (route.includes('(.*)')) {
      const baseRoute = route.replace('(.*)', '')
      return pathname.startsWith(baseRoute)
    }
    return pathname === route
  })
  
  // Get token from cookie
  const token = request.cookies.get('token')?.value
  
  if (!token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }
  
  // Verify token
  try {
    const decoded = await verifyToken(token)
    
    if (!decoded) {
      const url = new URL('/login', request.url)
      url.searchParams.set('redirect', pathname)
      const response = NextResponse.redirect(url)
      response.cookies.delete('token')
      return response
    }
    
    // Check admin routes
    if (isAdminRoute && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
    
    // Check regular protected routes
    const isProtectedRoute = protectedRoutes.includes(pathname) ||
      protectedRoutes.some(route => pathname.startsWith(route + '/'))
    
    if (isProtectedRoute && !isAdminRoute) {
      // Allow access to protected routes for authenticated users
      return NextResponse.next()
    }
    
    return NextResponse.next()
    
  } catch (error) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}