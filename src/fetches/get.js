export const url = import.meta.env.VITE_BASE_URL
const headers = { Authorization: `Bearer ${localStorage.getItem("token")}`, 'Content-Type': 'application/json' }

const getMainPage = async () => {
  return fetch(`${url}`)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getUser = async () => {
  return fetch(`${url}/auth/me`, {
    headers
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getProfile = async (id) => {
  return fetch(`${url}/users/profile/${id}`, {
    headers
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getAllOtherUsers = async () => {
  return fetch(`${url}/users`, {
    headers
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export {
  getMainPage,
  getUser,
  getProfile,
  getAllOtherUsers,
}