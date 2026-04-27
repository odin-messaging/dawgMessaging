import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import routes from "./routes"
import { UserProvider } from "./components/AuthContext"
import { AlertProvider } from "./components/AlertContext"

const router = createBrowserRouter(routes)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <AlertProvider>
        <RouterProvider router={router} />
      </AlertProvider>
    </UserProvider>
  </StrictMode>
)