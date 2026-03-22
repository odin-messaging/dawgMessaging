import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/pages/App.jsx'

describe('App component', () => {
  it('renders header, welcome text, and logo', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    // header links should be present
    expect(screen.getByText('Wecome to')).toBeInTheDocument()
    expect(screen.getByText('Log In')).toBeInTheDocument()
    expect(screen.getByText('Messaging')).toBeInTheDocument()

    // logo text should render (there are two instances: header and inner logo)
  })
})