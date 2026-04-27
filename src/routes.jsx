import App from "./pages/App"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./components/AuthContext"
import { NotFound } from "./pages/NotFound"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import ChoseFriendToMessage from "./pages/partials/ChoseFriendToMessage"
import MainPageDefaultOutlet from "./pages/partials/mainPageDefaultOutlet"
import Message from "./pages/partials/Message"
import ViewFriends from "./pages/partials/ViewFriends"
import ViewFriendDetails from "./pages/partials/ViewFriendDetails"
import SendFriendRequest from "./pages/partials/SendFriendRequest"
import AlertPopup from "./components/AlertPopup"

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
      {
        path: "/",
        element: <App />,
        children: [
          { path: "/", element: <MainPageDefaultOutlet /> },
          { path: "/message", element: <ChoseFriendToMessage /> },
          { path: "/friends", element: <ViewFriends /> },
          { path: "/friends/:id", element: <ViewFriendDetails /> },
          { path: "/message/:id", element: <Message /> },
          { path: "/profile/:id", element: <Profile /> },
          { path: "/friends/request", element: <SendFriendRequest /> },
          { path: "/profile/edit", element: <EditProfile /> },
        ]
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]

export default routes