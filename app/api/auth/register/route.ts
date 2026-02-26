import { NextResponse } from 'next/server'
import { registerUser } from '@/lib/api/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, avatar } = body

    console.log('📝 Registration attempt for:', email)

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    const result = await registerUser({ email, password, name, avatar })

    if (!result) {
      console.log('❌ Registration failed - user may exist')
      return NextResponse.json(
        { error: 'Registration failed. User may already exist.' },
        { status: 409 }
      )
    }

    console.log('✅ Registration successful for:', result.user.name)

    // Create response first
    const response = NextResponse.json({
      user: result.user,
      token: result.token,
      success: true
    })

    // Set cookie on the response object
    response.cookies.set({
      name: 'token',
      value: result.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    console.log('🍪 Cookie attached to response')
    
    return response
  } catch (error) {
    console.error('❌ Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}