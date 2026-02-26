import { User, LoginCredentials, RegisterData, AuthResponse } from '@/types/user'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { JWT_SECRET, JWT_EXPIRES_IN, getSecretKey } from '@/lib/constants'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.escuelajs.co/api/v1'

// Login with Platzi Fake Store API
export async function loginUser(credentials: LoginCredentials): Promise<{ user: User; token: string } | null> {
  try {
    console.log('🔐 loginUser called with:', credentials.email)
    
    const authResponse = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })

    if (!authResponse.ok) {
      const error = await authResponse.json()
      console.error('Login error:', error)
      return null
    }

    const authData: AuthResponse = await authResponse.json()
    
    const profileResponse = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${authData.access_token}`
      }
    })

    if (!profileResponse.ok) {
      console.error('Profile fetch failed')
      return null
    }

    const userData: User = await profileResponse.json()
    
    // Generate token using jose
    const token = await generateToken(userData)

    return { user: userData, token }
  } catch (error) {
    console.error('Login error:', error)
    return null
  }
}

// Register with Platzi Fake Store API
export async function registerUser(data: RegisterData): Promise<{ user: User; token: string } | null> {
  try {
    const registerResponse = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name,
        avatar: data.avatar || 'https://api.lorem.space/image/face?w=150&h=150'
      })
    })

    if (!registerResponse.ok) {
      const error = await registerResponse.json()
      console.error('Registration error:', error)
      return null
    }

    const newUser: User = await registerResponse.json()
    
    return await loginUser({ 
      email: data.email, 
      password: data.password 
    })
  } catch (error) {
    console.error('Registration error:', error)
    return null
  }
}

// Get user by ID
export async function getUserById(id: number): Promise<User | null> {
  try {
    const response = await fetch(`${API_URL}/users/${id}`)
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    return null
  }
}

// Generate JWT token using jose (Edge compatible)
export async function generateToken(user: User): Promise<string> {
  console.log('🔑 Generating token with jose')
  
  const secretKey = getSecretKey()
  
  const token = await new SignJWT({ 
    id: user.id, 
    email: user.email,
    name: user.name,
    role: user.role
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secretKey)
  
  console.log('✅ Token generated successfully')
  return token
}

// Verify JWT token using jose (Edge compatible)
export async function verifyToken(token: string): Promise<any> {
  try {
    console.log('🔍 Verifying token with jose')
    
    const secretKey = getSecretKey()
    const { payload } = await jwtVerify(token, secretKey)
    
    console.log('✅ Token verified successfully for:', payload.email)
    return payload
  } catch (error) {
    console.error('❌ Token verification failed:', error.message)
    return null
  }
}

// Set auth cookie
export function setAuthCookieInResponse(response: NextResponse, token: string): NextResponse {
  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  
  console.log('✅ Cookie set in response')
  return response
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  
  cookieStore.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  
  console.log('✅ Cookie set in cookie store')
}

export async function getAuthCookie() {
  const cookieStore = await cookies()
  return cookieStore.get('token')?.value
}

export async function removeAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
  console.log('✅ Cookie removed')
}