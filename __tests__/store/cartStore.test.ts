import { useCartStore } from '@/app/store/cartStore'

describe('cartStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    useCartStore.setState({ items: [] })
  })

  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    image: 'test.jpg'
  }

  it('adds item to cart', () => {
    useCartStore.getState().addItem(mockProduct)
    
    const items = useCartStore.getState().items
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({ ...mockProduct, quantity: 1 })
  })

  it('adds item with custom quantity', () => {
    useCartStore.getState().addItem(mockProduct, 3)
    
    const items = useCartStore.getState().items
    expect(items[0].quantity).toBe(3)
  })

  it('increments quantity when adding existing item', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().addItem(mockProduct)
    
    const items = useCartStore.getState().items
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(2)
  })

  it('removes item from cart', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().removeItem(1)
    
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('updates item quantity', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().updateQuantity(1, 5)
    
    const items = useCartStore.getState().items
    expect(items[0].quantity).toBe(5)
  })

  it('removes item when quantity set to 0', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().updateQuantity(1, 0)
    
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('clears cart', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().addItem({ ...mockProduct, id: 2 })
    useCartStore.getState().clearCart()
    
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('calculates total items correctly', () => {
    useCartStore.getState().addItem(mockProduct, 2)
    useCartStore.getState().addItem({ ...mockProduct, id: 2 }, 3)
    
    expect(useCartStore.getState().getTotalItems()).toBe(5)
  })

  it('calculates subtotal correctly', () => {
    useCartStore.getState().addItem(mockProduct, 2) // 29.99 * 2 = 59.98
    useCartStore.getState().addItem({ ...mockProduct, id: 2, price: 19.99 }, 3) // 19.99 * 3 = 59.97
    
    expect(useCartStore.getState().getSubtotal()).toBeCloseTo(119.95, 2)
  })

  it('calculates shipping correctly (free over $50)', () => {
    // Under $50
    useCartStore.getState().addItem({ ...mockProduct, price: 30 }, 1)
    expect(useCartStore.getState().getShipping()).toBe(5.99)

    // Over $50
    useCartStore.getState().addItem({ ...mockProduct, price: 30 }, 2)
    expect(useCartStore.getState().getShipping()).toBe(0)
  })
})