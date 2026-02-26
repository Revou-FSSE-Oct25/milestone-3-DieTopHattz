import { NextResponse } from 'next/server'

export async function POST() {
  console.log('🚪 Logout attempt')
  
  // Create response
  const response = NextResponse.json({ success: true })
  
  // Clear the cookie
  response.cookies.set({
    name: 'token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0, // Expire immediately
    path: '/',
  })
  
  console.log('🍪 Cookie cleared')
  
  return response
}