export const url = import.meta.env.VITE_BASE_URL

const getMainPage = async () => {
  return fetch(`${url}`)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getUser = async () => {
  return fetch(`${url}/auth/me`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export {
  getMainPage,
  getUser
}