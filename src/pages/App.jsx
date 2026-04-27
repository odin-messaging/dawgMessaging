import { useState, useEffect } from 'react'
import { useOnlineHeartbeat } from '../components/onlineHeartbeat'
import '../css/globle.css'
import '../css/dropdown.css'
import Header from '../components/Header'
import { getAllOtherUsers } from '../fetches/get'
import DisplayUsers from '../components/DisplayUsers'
import { Outlet } from "react-router-dom"
import AlertPopup from '../components/AlertPopup'

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
      <AlertPopup />

      <Header links={[]} />

      <div className='appMainPage'>
        <div className='appLeftSide'>
          {otherUsers &&
            <div className="userList">
              <div className="legend">Users</div>
              <hr />
              <DisplayUsers
                dropdown={[
                  { title: 'View Profile', href: `/profile` }
                ]} users={otherUsers} />
            </div>
          }
        </div>

        <div className='appRightSide'>
          <div className='partial'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App