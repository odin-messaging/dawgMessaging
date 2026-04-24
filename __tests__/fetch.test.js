import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getMainPage, baseUrl } from '../src/fetches/get'

describe('getMainPage function', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: 'ok' }),
      })
    )
  })

  it('calls fetch with the base URL and returns parsed json', async () => {
    const result = await getMainPage()
    expect(global.fetch).toHaveBeenCalledWith(baseUrl)
    expect(result).toEqual({ data: 'ok' })
  })
})