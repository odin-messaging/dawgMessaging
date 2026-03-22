import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../src/components/Header.jsx'

describe('Header component', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Header links={[{ title: 'Log In', href: '/login' }]} />
      </MemoryRouter>
    )

    expect(screen.getByText('Log In')).toBeInTheDocument()

    // Should include the logo (contains the Messaging text)
    expect(screen.getByText('Messaging')).toBeInTheDocument()
  })
})