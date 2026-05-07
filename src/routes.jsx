import App from "./pages/App"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./components/AuthContext"
import { NotFound } from "./pages/NotFound"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import ChoseFriendToMessage from "./pages/partials/ChoseChatToMessage"
import MainPageDefaultOutlet from "./pages/partials/mainPageDefaultOutlet"
import Message from "./pages/partials/Message"
import ViewFriends from "./pages/partials/ViewFriends"
import ViewFriendDetails from "./pages/partials/ViewFriendDetails"
import SendFriendRequest from "./pages/partials/SendFriendRequest"
import ViewFriendRequests from "./pages/partials/ViewFriendRequests"
import ChoseFriendToAddToChat from "./pages/partials/ChoseFriendToAddToChat"
import CreateNewGroupChat from "./pages/partials/CreateNewGroupChat"

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
          { path: "/friends/request", element: <SendFriendRequest /> },
          { path: "/friends/requests", element: <ViewFriendRequests /> },
          { path: '/friends/chat/add/:id', element: <ChoseFriendToAddToChat /> },
          { path: "/profile/edit", element: <EditProfile /> },
          { path: "/users/friends/chats/create", element: <CreateNewGroupChat /> },
          { path: "/users/friends/chats/:id", element: <Message /> },
          { path: "/friends/:id", element: <ViewFriendDetails /> },
          { path: "/profile/:id", element: <Profile /> },
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