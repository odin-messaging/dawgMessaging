import { useState, useEffect } from 'react'
import { useOnlineHeartbeat } from '../components/onlineHeartbeat'
import '../css/globle.css'
import '../css/dropdown.css'
import Header from '../components/Header'
import { getAllOtherUsers } from '../fetches/get'
import DisplayUsers from '../components/DisplayUsers'
import { Outlet } from "react-router-dom"

const App = () => {
  const [otherUsers, setOtherUsers] = useState(null)

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
          {otherUsers &&
            <div className="userList">
              <div className="legend">Users</div>
              <hr />
              <DisplayUsers users={otherUsers} />
            </div>
          }
        </div>

        <div className='appRightSide'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App