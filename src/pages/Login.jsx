import { useState, useEffect } from "react"
import Header from "../components/Header"
import '../css/authForm.css'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import Error from "../components/Error"
import { useAuth } from "../components/AuthContext"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState([])
  const navigate = useNavigate()
  const { loginUser } = useAuth()

  const sendLogin = async (e) => {
    e.preventDefault()
    setValidationError([])
    try {
      await loginUser(username, password)
      navigate('/', { replace: true })
    } catch (err) {
      setValidationError(prev => [...prev, err.message || 'login failed'])
    }
  }

  return (
    <>
      <Header
        links={[
          { title: 'Home', href: '/' }
        ]}
      />

      <div className="authBtns">
        <Link to={'#'} className="active">Log In</Link>
        <Link to={'/signup'}>Sign Up</Link>
      </div>

      <form className="authForm" onSubmit={sendLogin}>
        {validationError.length > 0 && <Error errors={validationError} />}
        <legend>Log In</legend>
        <label >
          <span>Username</span>
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label >
          <span>Password</span>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button className="submit" type="submit">Log In</button>
      </form>
    </>
  )
}

export default Login