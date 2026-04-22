export const url = import.meta.env.VITE_BASE_URL
const headers = { 'Content-Type': 'application/json' }

const getMainPage = async () => {
  return fetch(`${url}`)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getUser = async () => {
  return fetch(`${url}/auth/me`, {
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
  return fetch(`${url}/users/profile/${id}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getAllOtherUsers = async () => {
  return fetch(`${url}/users`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getFriends = async () => {
  return fetch(`${url}/users/friends`, {
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
  getFriends
}