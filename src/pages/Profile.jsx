import Header from "../components/Header"
import { useEffect } from "react"
import { useAuth } from "../components/AuthContext"
import { Link } from "react-router-dom"
import { isWithinTenMinutes } from "../components/checkOnlineStatus"
import '../css/profile.css'
import { lorelei, adventurer, bottts, rings } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'

const Profile = () => {
  const AVATAR_STYLES = { adventurer, lorelei, bottts, rings }
  const { user } = useAuth()

  useEffect(() => {
    console.log(user)
  })

  return (
    <>
      <Header links={[
        { title: 'Home', href: '/' },
        { title: 'Edit Profile', href: `/profile/edit/${user.id}` }
      ]} />


      {!user && <Link to='/login'>Log In</Link>}
      {user &&
        <div className="profileOutline">
          <div className="profileTop">
            <div className="profileTopLeft">
              <img
                className="changeAvatar"
                src={createAvatar(AVATAR_STYLES[user.avatar.style],
                  { seed: user.avatar.seed, size: 128 }).toDataUri()}
                alt="User Avatar"
              />
              <div>{user.username}</div>
            </div>
            <div>{isWithinTenMinutes(user.lastSeen) ?
              <div className="flex"><span>Online</span><div className="onlineStatus online"></div></div>
              :
              <div className="flex"><span>Offline</span><div className="onlineStatus offline"></div></div>}</div>
          </div>
          <hr />
          <div className="profileBottom">{user.blurb}</div>
        </div>
      }
    </>
  )
}

export default Profile