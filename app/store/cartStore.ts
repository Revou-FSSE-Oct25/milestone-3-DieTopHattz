import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image: string
}

interface CartStore {
  items: CartItem[]
  
  // Actions
  addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  
  // Derived state (computed)
  getTotalItems: () => number
  getSubtotal: () => number
  getShipping: () => number
  getTax: () => number
  getTotal: () => number
}

// Free shipping threshold
const FREE_SHIPPING_THRESHOLD = 50
const SHIPPING_COST = 5.99
const TAX_RATE = 0.08

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // Add item to cart
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id)
          
          if (existingItem) {
            // Update quantity if item exists
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            }
          } else {
            // Add new item
            return {
              items: [...state.items, { ...product, quantity }]
            }
          }
        })
      },

      // Remove item from cart
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }))
      },

      // Update item quantity
      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          // Remove item if quantity is 0
          get().removeItem(id)
          return
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }))
      },

      // Clear entire cart
      clearCart: () => {
        set({ items: [] })
      },

      // Get total number of items (sum of quantities)
      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      // Calculate subtotal
      getSubtotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      // Calculate shipping cost
      getShipping: () => {
        const subtotal = get().getSubtotal()
        return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
      },

      // Calculate tax
      getTax: () => {
        const subtotal = get().getSubtotal()
        return subtotal * TAX_RATE
      },

      // Calculate total
      getTotal: () => {
        const subtotal = get().getSubtotal()
        const shipping = get().getShipping()
        const tax = get().getTax()
        return subtotal + shipping + tax
      }
    }),
    {
      name: 'cart-storage', // localStorage key
      partialize: (state) => ({ items: state.items }) // Only persist items
    }
  )
)