import { describe, it, expect } from 'vitest'
import * as post from '../src/fetches/post'
import * as del from '../src/fetches/delete'
import * as patch from '../src/fetches/patch'

describe('fetch modules placeholders', () => {
  it('modules import successfully', () => {
    expect(post).toBeDefined()
    expect(del).toBeDefined()
    expect(patch).toBeDefined()
  })
})