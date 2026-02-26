import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '@/components/ProductCard'
import { useCartStore } from '@/app/store/cartStore'
import { useToast } from '@/app/providers/ToastProvider'

// Mock the hooks
jest.mock('@/app/store/cartStore')
jest.mock('@/app/providers/ToastProvider')

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'This is a test product',
  category: 'test',
  image: 'https://test.com/image.jpg',
  rating: { rate: 4.5, count: 100 }
}

describe('ProductCard', () => {
  const mockAddItem = jest.fn()
  const mockShowToast = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    
    ;(useCartStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = { addItem: mockAddItem }
      return selector ? selector(state) : state
    })
    
    ;(useToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast
    })
  })

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(screen.getByText('⭐ 4.5 (100)')).toBeInTheDocument()
  })

  it('has a link to the product detail page', () => {
    render(<ProductCard product={mockProduct} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/products/1')
  })

  it('has an add to cart button', () => {
    render(<ProductCard product={mockProduct} />)
    
    const button = screen.getByRole('button', { name: /add to cart/i })
    expect(button).toBeInTheDocument()
  })

  it('calls addToCart when button is clicked', () => {
    render(<ProductCard product={mockProduct} />)
    
    const button = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(button)
    
    expect(mockAddItem).toHaveBeenCalledWith({
      id: 1,
      title: 'Test Product',
      price: 29.99,
      image: 'https://test.com/image.jpg'
    })
    expect(mockShowToast).toHaveBeenCalledWith(
      'Added Test Product to cart!',
      'success'
    )
  })

  it('prevents navigation when add to cart is clicked', () => {
    const mockPreventDefault = jest.fn()
    render(<ProductCard product={mockProduct} />)
    
    const button = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(button, { preventDefault: mockPreventDefault })
    
    expect(mockPreventDefault).toHaveBeenCalled()
  })
})