const url = import.meta.env.VITE_BASE_URL
const headers = { Authorization: `Bearer ${localStorage.getItem("token")}`, 'Content-Type': 'application/json' }

// updatedUser obj of the form 
//------------------------------------------------//
// {
//  avatar:{ id: number, style: string, seed: string }
//  avatarId: number
//  blurb: string
//  id: number
//  lastSeen: dateTime
//  password: hashed string
//  username: string
// }
//------------------------------------------------//

const updateUser = async (updatedUser) => {
  try {
    const res = await fetch(`${url}/auth/me`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ updatedUser }) // body must be an obj to allow destructering on the server
    })

    const data = await res.json()

    if (data.error) console.log(data.error)

    if (!res.ok) {
      console.log('throwing')
      throw new Error(data.error)
    }

    return data
  } catch (err) {
    throw new Error(err.message || 'Network error')
  }
}

export {
  updateUser,
}