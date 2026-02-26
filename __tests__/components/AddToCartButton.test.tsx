import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AddToCartButton from '@/components/AddToCartButton'
import { useCartStore } from '@/app/store/cartStore'
import { useToast } from '@/app/providers/ToastProvider'

jest.mock('@/app/store/cartStore')
jest.mock('@/app/providers/ToastProvider')

describe('AddToCartButton', () => {
  const mockAddItem = jest.fn()
  const mockShowToast = jest.fn()
  
  const mockProps = {
    productId: 1,
    productName: 'Test Product',
    productPrice: 29.99,
    productImage: 'https://test.com/image.jpg'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    
    ;(useCartStore as unknown as jest.Mock).mockImplementation(() => ({
      addItem: mockAddItem
    }))
    
    ;(useToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast
    })
  })

  it('renders with default quantity 1', () => {
    render(<AddToCartButton {...mockProps} />)
    
    expect(screen.getByText('Add 1 to Cart')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('increases quantity when plus button is clicked', () => {
    render(<AddToCartButton {...mockProps} />)
    
    const plusButton = screen.getByText('+')
    fireEvent.click(plusButton)
    
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Add 2 to Cart')).toBeInTheDocument()
  })

  it('decreases quantity when minus button is clicked', () => {
    render(<AddToCartButton {...mockProps} />)
    
    const plusButton = screen.getByText('+')
    fireEvent.click(plusButton)
    fireEvent.click(plusButton) // Now 3
    
    const minusButton = screen.getByText('-')
    fireEvent.click(minusButton) // Now 2
    
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('does not go below 1 when minus button is clicked', () => {
    render(<AddToCartButton {...mockProps} />)
    
    const minusButton = screen.getByText('-')
    fireEvent.click(minusButton) // Should stay at 1
    fireEvent.click(minusButton) // Should stay at 1
    
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('calls addToCart with correct quantity when clicked', async () => {
    render(<AddToCartButton {...mockProps} />)
    
    const plusButton = screen.getByText('+')
    fireEvent.click(plusButton) // Now 2
    
    const addButton = screen.getByText('Add 2 to Cart')
    fireEvent.click(addButton)
    
    await waitFor(() => {
      expect(mockAddItem).toHaveBeenCalledWith(
        {
          id: 1,
          title: 'Test Product',
          price: 29.99,
          image: 'https://test.com/image.jpg'
        },
        2
      )
    })
    
    expect(mockShowToast).toHaveBeenCalledWith(
      'Added 2 Test Products to cart!',
      'success'
    )
  })

  it('shows loading state when adding to cart', async () => {
    render(<AddToCartButton {...mockProps} />)
    
    const addButton = screen.getByText('Add 1 to Cart')
    fireEvent.click(addButton)
    
    expect(await screen.findByText('Adding to Cart...')).toBeInTheDocument()
  })
})