import { formatCurrency } from '@/lib/utils/formatCurrency'

describe('formatCurrency', () => {
  it('formats whole numbers correctly', () => {
    expect(formatCurrency(10)).toBe('$10.00')
  })

  it('formats decimal numbers correctly', () => {
    expect(formatCurrency(10.99)).toBe('$10.99')
  })

  it('formats large numbers correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00')
  })

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('formats negative numbers correctly', () => {
    expect(formatCurrency(-10.5)).toBe('-$10.50')
  })
})