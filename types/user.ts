export interface User {
  id: number
  email: string
  password?: string
  name: string
  role: 'customer' | 'admin'
  avatar: string
  creationAt?: string
  updatedAt?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  avatar?: string
}

export interface AuthResponse {
  access_token: string
  refresh_token?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
}