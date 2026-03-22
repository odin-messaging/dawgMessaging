import Header from "../components/Header"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="goHome">
        <p>
          404
          <br />
          Page not found
        </p>
        <Link to={'/'}>Go Home</Link>
      </div>
    </>
  )
}

export { NotFound }