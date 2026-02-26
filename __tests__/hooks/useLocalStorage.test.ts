import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '@/app/hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns initial value when no stored value exists', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    const [value] = result.current
    expect(value).toBe('initial')
  })

  it('returns stored value when it exists', () => {
    window.localStorage.setItem('test-key', JSON.stringify('stored'))
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    const [value] = result.current
    expect(value).toBe('stored')
  })

  it('updates stored value when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    const [, setValue] = result.current
    
    act(() => {
      setValue('updated')
    })
    
    const [value] = result.current
    expect(value).toBe('updated')
    expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('updated'))
  })

  it('handles function updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0))
    
    const [, setValue] = result.current
    
    act(() => {
      setValue((prev: number) => prev + 1)
    })
    
    const [value] = result.current
    expect(value).toBe(1)
  })

  it('handles errors gracefully', () => {
    // Mock localStorage to throw error
    jest.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('Storage error')
    })

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    const [, setValue] = result.current
    
    expect(() => {
      act(() => {
        setValue('updated')
      })
    }).not.toThrow()
  })
})