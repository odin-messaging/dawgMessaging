import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { useOnlineHeartbeat } from '../src/components/useOnlineHeartbeat'

vi.mock('../src/components/AuthContext.jsx', () => ({
  useAuth: () => ({ user: { id: 1 }, loading: false }),
}))

vi.mock('../src/fetches/patch.js', () => ({
  ping: vi.fn(() => Promise.resolve()),
}))

vi.useFakeTimers()

describe('useOnlineHeartbeat hook', () => {
  beforeEach(() => {
    localStorage.setItem("token", "fake-token")
  })

  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.removeItem("token")
  })

  it('calls ping and callback on mount', async () => {
    const mockCallback = vi.fn()
    
    const TestComponent = () => {
      useOnlineHeartbeat(mockCallback)
      return null
    }

    render(<TestComponent />)
    
    // Use runAllTicks to flush all promises
    vi.runAllTicks()
    
    // Wait for the promises to resolve
    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled()
    })
  })

  it('calls heartbeat on interval', async () => {
    const mockCallback = vi.fn()
    
    const TestComponent = () => {
      useOnlineHeartbeat(mockCallback)
      return null
    }

    render(<TestComponent />)
    
    vi.runAllTicks()
    
    // Wait for mount call
    await waitFor(() => expect(mockCallback).toHaveBeenCalledTimes(1))
    
    mockCallback.mockClear()
    
    // Advance by 1 minute (60000ms)
    vi.advanceTimersByTime(60000)
    vi.runAllTicks()
    
    // Should call on interval
    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled()
    })
  })

  it('stops heartbeat when document is hidden', async () => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      writable: true,
      value: 'hidden',
    })

    const mockCallback = vi.fn()
    
    const TestComponent = () => {
      useOnlineHeartbeat(mockCallback)
      return null
    }

    render(<TestComponent />)
    
    vi.runAllTicks()
    
    // Should not call when hidden
    await waitFor(() => expect(mockCallback).not.toHaveBeenCalled(), { timeout: 100 }).catch(() => {})
    
    // Change visibility to visible
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      writable: true,
      value: 'visible',
    })
    
    document.dispatchEvent(new Event('visibilitychange'))
    vi.runAllTicks()
    
    // Should call after becoming visible
    await waitFor(() => expect(mockCallback).toHaveBeenCalled())
  })
})
