import { useState, useEffect } from "react"
import Header from "../components/Header"
import '../css/authForm.css'
import { signup } from "../fetches/post"
import { Link } from "react-router-dom"
import Error from "../components/Error"
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState([])
  const navigate = useNavigate()

  const sendSignup = async (e) => {
    setValidationError([])
    e.preventDefault()
    if (username.length > 30 || username.length < 2) {
      setValidationError(prev => [...prev, 'Username must be between 2 and 30 characters'])
      setUsername('')
      return
    }
    if (password !== confirmPassword) {
      setValidationError((prev) => [...prev, 'Passwords do not match'])
      setConfirmPassword('')
      setPassword('')
      return
    }
    try {
      await signup(username, password)
      navigate('/login', { replace: true });

    } catch (err) {
      console.error('Signup failed', err)
      setValidationError((prev) => [...prev, err.message || 'Signup failed'])
    }
  }

  return (
    <>
      <Header />

      <div className="authBtns">
        <Link to={'/login'}>Log In</Link>
        <Link className="active" to={'#'}>Sign Up</Link>
      </div>

      <form className="authForm" onSubmit={sendSignup}>
        {validationError.length > 0 && <Error errors={validationError} />}
        <legend>Sign Up</legend>
        <label >
          <span>Username</span>
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label >
          <span>Password</span>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label >
          <span>Confirm Password</span>
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>

        <button className="submit" type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default Signup