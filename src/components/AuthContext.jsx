import { createContext, useEffect, useState, useContext } from "react"
import { getUser } from "../fetches/get"
import { login } from "../fetches/post"
import { useNavigate } from "react-router-dom"

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const user = await getUser()
        setUser(user)
      } catch (err) {
        console.log("No user or invalid token")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const loginUser = async (username, password) => {
    try {
      const token = await login(username, password)
      localStorage.setItem("token", token)

      const user = await getUser()
      setUser(user)
      return user
    } catch (error) {
      console.log(error)

      throw new Error(error.message || "Failed to fetch user")
    }
  }

  function logoutUser() {
    localStorage.removeItem("token")
    console.log('logged out')
    setUser(null)
    navigate("/login", { replace: true })
  }

  return (
    <UserContext.Provider value={{ user, setUser, loading, loginUser, logoutUser, isAuthenticated: !!user }}>
      {children}
    </UserContext.Provider>
  )
}

export function useAuth() {
  return useContext(UserContext)
}