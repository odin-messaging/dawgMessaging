export const baseUrl = import.meta.env.VITE_BASE_URL
const headers = { 'Content-Type': 'application/json' }

const deleteFriend = async (friendId) => {
  return fetch(`${baseUrl}/users/friends/${friendId}`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const deleteFriendRequest = async (friendId) => {
  return fetch(`${baseUrl}/users/friends/requests/${friendId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export {
  deleteFriend,
  deleteFriendRequest,
}