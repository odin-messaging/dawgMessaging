import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import { useOnlineHeartbeat } from '../src/components/onlineHeartbeat'

// useFakeTimers so we can advance intervals
vi.useFakeTimers()

describe('useOnlineHeartbeat hook', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() => Promise.resolve({}))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const TestComponent = ({ interval }) => {
    useOnlineHeartbeat(interval)
    return null
  }

  it('calls fetch immediately and on interval and when document becomes visible', () => {
    render(<TestComponent interval={1000} />)

    // initial ping
    expect(global.fetch).toHaveBeenCalledTimes(1)

    // advance one interval
    vi.advanceTimersByTime(1000)
    expect(global.fetch).toHaveBeenCalledTimes(2)

    // simulate visibility change
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'visible',
    })
    document.dispatchEvent(new Event('visibilitychange'))

    expect(global.fetch).toHaveBeenCalledTimes(3)
  })
})