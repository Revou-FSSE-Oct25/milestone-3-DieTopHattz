import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/app/hooks/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500))
    expect(result.current).toBe('test')
  })

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )

    expect(result.current).toBe('initial')

    // Change value
    rerender({ value: 'changed', delay: 500 })

    // Value should still be 'initial' before timeout
    expect(result.current).toBe('initial')

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Now value should be updated
    expect(result.current).toBe('changed')
  })

  it('cancels debounce on unmount', () => {
    const { result, rerender, unmount } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )

    rerender({ value: 'changed', delay: 500 })
    unmount()

    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Value should still be 'initial' because timeout was cancelled
    expect(result.current).toBe('initial')
  })

  it('handles multiple rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )

    // Rapidly change value multiple times
    rerender({ value: 'change1', delay: 500 })
    act(() => {
      jest.advanceTimersByTime(200)
    })

    rerender({ value: 'change2', delay: 500 })
    act(() => {
      jest.advanceTimersByTime(200)
    })

    rerender({ value: 'change3', delay: 500 })
    
    // Should still be initial
    expect(result.current).toBe('initial')

    // Advance to final timeout
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Should be last value
    expect(result.current).toBe('change3')
  })
})