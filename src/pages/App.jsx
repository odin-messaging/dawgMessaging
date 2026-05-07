import { useState } from 'react'
import { useOnlineHeartbeat } from '../components/useOnlineHeartbeat'
import '../css/globle.css'
import '../css/dropdown.css'
import Header from '../components/Header'
import { getAllOtherUsers } from '../fetches/get'
import DisplayUsers from '../components/DisplayUsers'
import { Outlet } from "react-router-dom"
import AlertPopup from '../components/AlertPopup'
import LoadingSpinner from '../components/LoadingSpinner'

const App = () => {
  const [otherUsers, setOtherUsers] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  useOnlineHeartbeat(() => load())

  const load = async (showSpinner = false) => {// false = don't show spinner
    if (showSpinner) setLoading(true)

    // console.log('hitting load')

    try {
      const users = await getAllOtherUsers()
      setOtherUsers(users)
      setError(null)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      if (showSpinner) setLoading(false)
      // console.log('ending load')
    }
  }

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
              {otherUsers.length == 0 && <p>There are no other users!</p>}
              {!loading && otherUsers.length > 0 && (
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