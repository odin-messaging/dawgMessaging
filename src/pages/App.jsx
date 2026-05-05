import { useState, useEffect, useCallback } from 'react'
import { useOnlineHeartbeat } from '../components/onlineHeartbeat'
import '../css/globle.css'
import '../css/dropdown.css'

import Header from '../components/Header'
import { getAllOtherUsers } from '../fetches/get'
import DisplayUsers from '../components/DisplayUsers'
import { Outlet } from "react-router-dom"
import AlertPopup from '../components/AlertPopup'
import LoadingSpinner from '../components/LoadingSpinner'
import { ping } from '../fetches/patch'

const App = () => {
  const [otherUsers, setOtherUsers] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async (showSpinner = true) => {
    if (showSpinner) setLoading(true)

    try {
      const users = await getAllOtherUsers()
      setOtherUsers(users)
      setError(null)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      if (showSpinner) setLoading(false)
    }
  }

  useEffect(() => {
    ping
    load(true)
  }, [])

  const heartBeatFunction = useCallback(async () => {
    try {
      await ping()
      await load(false)  // false = don't show spinner
    } catch (err) {
      console.debug("Heartbeat failed", err)
    }
  }, [])

  useOnlineHeartbeat(heartBeatFunction)

  return (
    <div className="appWrapper">
      <AlertPopup />
      <Header links={[]} />

      <div className='appMainPage'>
        <div className='appLeftSide'>
          {error && <div className="error-message">{error.message || error}</div>}

          {otherUsers && (
            <div className="userList">
              <div className="legend">Users</div>
              <hr />
              {loading && <LoadingSpinner />}
              {!loading && (
                <DisplayUsers
                  dropdown={[{ title: 'View Profile', href: `/profile` }]}
                  users={otherUsers}
                />
              )}
            </div>
          )}
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