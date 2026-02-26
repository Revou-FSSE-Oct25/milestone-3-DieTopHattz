import { NextResponse } from 'next/server'
import { loginUser } from '@/lib/api/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log('🔐 Login API called for:', email)

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const result = await loginUser({ email, password })

    if (!result) {
      console.log('❌ Login failed - invalid credentials')
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log('✅ Login successful for:', result.user.name)

    const response = NextResponse.json({
      user: result.user,
      token: result.token,
      success: true
    })

    response.cookies.set({
      name: 'token',
      value: result.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    console.log('🍪 Cookie set')
    return response
    
  } catch (error) {
    console.error('❌ Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}