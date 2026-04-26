import Header from "../components/Header"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../components/AuthContext"
import { isWithinTenMinutes } from "../components/checkOnlineStatus"
import '../css/profile.css'
import { lorelei, adventurer, bottts, rings } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { getProfile } from "../fetches/get"
import { useParams } from "react-router"
import LoadingSpinner from "../components/LoadingSpinner"

const ProfileUI = ({ profile, loading }) => {
  const AVATAR_STYLES = { adventurer, lorelei, bottts, rings }

  return (
    <>
      {!loading && profile &&
        <div className="profileOutline">
          <div className="profileTop">
            <div className="profileTopLeft">
              <img
                className="avatar"
                src={createAvatar(AVATAR_STYLES[profile.avatar.style],
                  { seed: profile.avatar.seed, size: 128 }).toDataUri()}
                alt=""
              />
              <div>{profile.username}</div>
            </div>
            <div>{isWithinTenMinutes(profile.lastSeen) ?
              <div className="flex"><span>Online</span><div className="onlineStatus online"></div></div>
              :
              <div className="flex"><span>Offline</span><div className="onlineStatus offline"></div></div>}</div>
          </div>
          <hr />
          <div className="profileBottom">{profile.blurb}</div>
        </div>
      }
    </>
  )
}

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const profile = await getProfile(id)
        setProfile(profile)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <>
      <Header links={[
        { title: 'Home', href: '/' },
        Number(user.id) === Number(id) && { title: 'Edit Profile', href: '/profile/edit' }
      ].filter(Boolean)} />

      {loading && <LoadingSpinner />}
      {!loading && !profile && <Link to='/login'>Log In</Link>}
      <ProfileUI profile={profile} loading={loading} />
    </>
  )
}

export default Profile
export {
  ProfileUI
}