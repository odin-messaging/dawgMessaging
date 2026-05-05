import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useParams: () => ({ id: 'friend-123' }),
  }
})

vi.mock('../src/components/AuthContext.jsx', () => ({
  useAuth: () => ({ user: { id: 1 } }),
}))

vi.mock('../src/fetches/get.js')

const { getConversation } = await import('../src/fetches/get.js')
import Message from '../src/pages/partials/Message.jsx'

describe('Message component', () => {
  beforeEach(() => {
    getConversation.mockReset()
  })

  it('loads the initial conversation, then loads older messages and newer messages correctly', async () => {
    const initialMessages = [
      { id: '4', message: 'latest message', sender: { id: 1, username: 'user1', avatar: { style: 'adventurer', seed: 'seed1' } } },
      { id: '3', message: 'recent message', sender: { id: 2, username: 'user2', avatar: { style: 'lorelei', seed: 'seed2' } } },
    ]

    const olderMessages = [
      { id: '2', message: 'older message', sender: { id: 2, username: 'user2', avatar: { style: 'lorelei', seed: 'seed2' } } },
      { id: '1', message: 'oldest message', sender: { id: 1, username: 'user1', avatar: { style: 'adventurer', seed: 'seed1' } } },
    ]

    const newMessages = [
      { id: '5', message: 'new message1', sender: { id: 2, username: 'user2', avatar: { style: 'lorelei', seed: 'seed2' } } },
      { id: '6', message: 'new message2', sender: { id: 2, username: 'user2', avatar: { style: 'lorelei', seed: 'seed2' } } },
      { id: '7', message: 'new message3', sender: { id: 2, username: 'user2', avatar: { style: 'lorelei', seed: 'seed2' } } },
    ]

    getConversation
      .mockResolvedValueOnce(initialMessages)
      .mockImplementationOnce((friendId, lastMessageId, direction) => {
        expect(friendId).toBe('friend-123')
        expect(lastMessageId).toBe('4')
        expect(direction).toBe('desc')
        return Promise.resolve(olderMessages)
      })
      .mockImplementationOnce((friendId, lastMessageId, direction) => {
        expect(friendId).toBe('friend-123')
        expect(lastMessageId).toBe('3')
        expect(direction).toBe('asc')
        return Promise.resolve(newMessages)
      })

    const user = userEvent.setup()
    const { container } = render(
      <MemoryRouter>
        <Message />
      </MemoryRouter>
    )

    await screen.findByText('latest message')
    expect(getConversation).toHaveBeenNthCalledWith(1, 'friend-123', null, 'desc')

    const loadMoreButton = screen.getByRole('button', { name: /load more/i })
    await user.click(loadMoreButton)

    await screen.findByText('oldest message')
    let messageItems = container.querySelectorAll('.message')
    expect(Array.from(messageItems).map((item) => item.childNodes[0].textContent.trim())).toEqual([
      'older message',
      'oldest message',
      'latest message',
      'recent message',
    ])

    const refreshButton = container.querySelector('.sendMessage > img')
    await user.click(refreshButton)

    await screen.findByText('new message1')
    messageItems = container.querySelectorAll('.message')
    expect(Array.from(messageItems).map((item) => item.childNodes[0].textContent.trim())).toEqual([
      'older message',
      'oldest message',
      'latest message',
      'recent message',
      'new message1',
      'new message2',
      'new message3',
    ])
  })
})
