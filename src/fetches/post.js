const baseUrl = import.meta.env.VITE_BASE_URL
const headers = { 'Content-Type': 'application/json' }

const login = async (username, password) => {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Login failed')
    }

    return data 
  } catch (err) {
    throw new Error(err.message || 'Network error')
  }
}

const signup = async (username, password) => {
  try {
    const res = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    console.log(data.error)

    if (!res.ok) {
      console.log('throwing')
      throw new Error(data.error)
    }

    return data
  } catch (err) {
    throw new Error(err.message || 'Network error')
  }
}

const sendMessage = async (message, receiverId) => {
  try {
    const res = await fetch(`${baseUrl}/users/friends/message/${receiverId}`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ message })
    })
    
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || 'Failed to send message')
    }

    return data
  } catch (err) {
    throw new Error(err.message || 'Network error')
  }
}

const sendFriendRequest = async (friendId) => {
    try {
    const res = await fetch(`${baseUrl}/users/friends/request/${friendId}`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || 'Failed to send request')
    }

    return data
  } catch (err) {
    throw new Error(err.message || 'Network error')
  }
}

const acceptFriendRequest = async (friendId) => {
  return fetch(`${baseUrl}/users/friends/requests/${friendId}`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export {
  login,
  signup,
  sendMessage,
  sendFriendRequest,
  acceptFriendRequest,
}