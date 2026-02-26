'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useAuthStore } from '@/app/store/authStore'
import { User } from '@/types/user'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (data: any) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { 
    user, 
    token, 
    isLoading, 
    error, 
    login: storeLogin, 
    register: storeRegister, 
    logout: storeLogout,
    clearError,
    setUser
  } = useAuthStore()

  // Check authentication status on mount
  useEffect(() => {
    console.log('AuthProvider - Initial state:', { user, token, isLoading })
    
    const checkAuth = async () => {
      if (token && !user) {
        try {
          console.log('AuthProvider - Checking auth with token:', token)
          const response = await fetch('/api/auth/me')
          if (response.ok) {
            const data = await response.json()
            console.log('AuthProvider - User found:', data.user)
            setUser(data.user)
          } else {
            console.log('AuthProvider - Auth check failed')
          }
        } catch (error) {
          console.error('Auth check failed:', error)
        }
      }
    }
    checkAuth()
  }, [token, user, setUser])

  const login = async (email: string, password: string) => {
    console.log('AuthProvider - Login attempt:', email)
    return await storeLogin(email, password)
  }

  const register = async (data: any) => {
    return await storeRegister(data)
  }

  const logout = () => {
    console.log('AuthProvider - Logout')
    storeLogout()
  }

  const isAuthenticated = !!user
  const isAdmin = user?.role === 'admin'

  console.log('AuthProvider - Render:', { isAuthenticated, user, isLoading })

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      error,
      login,
      register,
      logout,
      isAuthenticated,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}