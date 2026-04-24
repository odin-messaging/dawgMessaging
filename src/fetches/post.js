const url = import.meta.env.VITE_BASE_URL
const headers = { 'Content-Type': 'application/json' }

const login = async (username, password) => {
  try {
    const res = await fetch(`${url}/auth/login`, {
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
    const res = await fetch(`${url}/auth/signup`, {
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
    const res = await fetch(`${url}/users/friends/message/${receiverId}`, {
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

export {
  login,
  signup,
  sendMessage,
}