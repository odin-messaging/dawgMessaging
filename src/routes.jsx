import App from "./pages/App"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Navigate, Outlet } from "react-router"
import { useAuth } from "./components/AuthContext"
import { NotFound } from "./pages/NotFound"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return null

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />;
}

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <App /> },
      { path: "/profile/edit", element: <EditProfile /> },
      { path: "/profile/:id", element: <Profile /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]

export default routes