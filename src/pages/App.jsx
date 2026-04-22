import { useState, useEffect } from 'react'
import { getMainPage } from '../fetches/get'
import { useOnlineHeartbeat } from '../components/onlineHeartbeat'
import '../css/globle.css'
import '../css/dropdown.css'
import Header from '../components/Header'
import Logo from '../components/logo'
import { useAuth } from '../components/AuthContext'
import { getAllOtherUsers } from '../fetches/get'
import DisplayUsers from '../components/DisplayUsers'
import { Navigate, Outlet } from "react-router-dom"

const App = () => {
  const [otherUsers, setOtherUsers] = useState(null)
  const { logoutUser, user } = useAuth()

  useEffect(() => {
    const load = async () => {
      const fetch = await getAllOtherUsers()
      setOtherUsers(fetch)
    }

    load()
  }, [])

return (
  <div className="appWrapper">
    <Header links={[]} />

    <div className='appMainPage'>
      <div className='appLeftSide'> 
        {otherUsers && <DisplayUsers users={otherUsers} />}
      </div>

      <div className='appRightSide'>
        <Outlet />
      </div>
    </div>
  </div>
)
}

export default App