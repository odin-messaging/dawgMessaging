import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/pages/App.jsx'
import { UserProvider } from '../src/components/AuthContext.jsx'

describe('App component', () => {
  it('renders header, welcome text, and logo', () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Log In')).toBeInTheDocument()
    expect(screen.getAllByText('Messaging')).toHaveLength(1)
  })
})