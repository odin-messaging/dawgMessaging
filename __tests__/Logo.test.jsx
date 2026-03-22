import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Logo from '../src/components/logo.jsx'

describe('Logo component', () => {
  it('renders the SVG text elements', () => {
    render(<Logo size={30} />)

    // the vertical rotated "Dawg" text does not appear as plain text but we can
    // verify the Messaging string which is always present
    expect(screen.getByText('Messaging')).toBeInTheDocument()
  })
})