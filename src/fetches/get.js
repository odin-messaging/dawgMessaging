export const baseUrl = import.meta.env.VITE_BASE_URL
const headers = { 'Content-Type': 'application/json' }

const getMainPage = async () => {
  return fetch(`${baseUrl}`)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getUser = async () => {
  return fetch(`${baseUrl}/auth/me`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getProfile = async (id) => {
  return fetch(`${baseUrl}/users/profile/${id}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getAllOtherUsers = async () => {
  const res = await fetch(`${baseUrl}/users`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`)
  }

  return await res.json()
}

const getAllFriendRequests = async () => {
  return fetch(`${baseUrl}/users/friends/requests`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getAllOtherUsersThatAreNotFriends = async () => {
  return fetch(`${baseUrl}/users/not-friends`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const sendAllFriendsNotInGroupChat = async (chatId) => {
  return fetch(`${baseUrl}/users/friends/not-in-chat/${chatId}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getFriends = async () => {
  return fetch(`${baseUrl}/users/friends`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getConversation = async (chatId, lastMessageId, direction) => {
  let url = `${baseUrl}/users/friends/message/${chatId}`

  if (lastMessageId && direction) {
    url += `?lastMessageId=${lastMessageId}&direction=${direction}`
  } else if (lastMessageId) {
    url += `?lastMessageId=${lastMessageId}`
  } else if (direction) {
    url += `?direction=${direction}`
  }

  return fetch(url, {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getUserChats = async () => {
  return fetch(`${baseUrl}/users/friends/chats`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export {
  getMainPage,
  getUser,
  getProfile,
  getAllOtherUsers,
  getFriends,
  getConversation,
  getAllOtherUsersThatAreNotFriends,
  getAllFriendRequests,
  getUserChats,
  sendAllFriendsNotInGroupChat
}