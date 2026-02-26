import { render, screen, fireEvent } from '@testing-library/react'
import Header from '@/components/Header'
import { useAuth } from '@/app/providers/AuthProvider'
import { useCartStore } from '@/app/store/cartStore'

jest.mock('@/app/providers/AuthProvider')
jest.mock('@/app/store/cartStore')

describe('Header', () => {
  const mockLogout = jest.fn()
  const mockGetTotalItems = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    
    ;(useCartStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = { getTotalItems: mockGetTotalItems }
      return selector ? selector(state) : state
    })
  })

  it('shows login link when user is not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      logout: mockLogout
    })

    mockGetTotalItems.mockReturnValue(0)
    
    render(<Header />)
    
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.queryByText('Logout')).not.toBeInTheDocument()
  })

  it('shows user menu when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: 'John Doe', role: 'customer' },
      isAuthenticated: true,
      logout: mockLogout
    })

    mockGetTotalItems.mockReturnValue(0)
    
    render(<Header />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.queryByText('Login')).not.toBeInTheDocument()
  })

  it('shows cart badge with correct item count', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      logout: mockLogout
    })

    mockGetTotalItems.mockReturnValue(3)
    
    render(<Header />)
    
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('shows admin dashboard link for admin users', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: 'Admin', role: 'admin' },
      isAuthenticated: true,
      logout: mockLogout
    })

    mockGetTotalItems.mockReturnValue(0)
    
    render(<Header />)
    
    const userMenuButton = screen.getByText('Admin')
    fireEvent.click(userMenuButton)
    
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
  })

  it('calls logout when logout button is clicked', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: 'John Doe', role: 'customer' },
      isAuthenticated: true,
      logout: mockLogout
    })

    mockGetTotalItems.mockReturnValue(0)
    
    render(<Header />)
    
    const userMenuButton = screen.getByText('John Doe')
    fireEvent.click(userMenuButton)
    
    const logoutButton = screen.getByText('Logout')
    fireEvent.click(logoutButton)
    
    expect(mockLogout).toHaveBeenCalled()
  })
})