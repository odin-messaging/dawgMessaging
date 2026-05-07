import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../components/AuthContext"
import isWithinThreeMinutes from "../components/checkOnlineStatus"
import '../css/profile.css'
import { lorelei, adventurer, bottts, rings } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { getProfile } from "../fetches/get"
import { useParams } from "react-router"
import LoadingSpinner from "../components/LoadingSpinner"
import PartialInfoTopPanel from "./partials/partialInfoTopPanel"

const ProfileUI = ({ profile, loading }) => {
  const AVATAR_STYLES = { adventurer, lorelei, bottts, rings }
  const { user } = useAuth()

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
            <div className="flexColumn">{isWithinThreeMinutes(profile.lastSeen) ?
              <div className="flex"><span>Online</span><div className="onlineStatus online"></div></div>
              :
              <div className="flex"><span>Offline</span><div className="onlineStatus offline"></div></div>}
             {user.id === profile.id && <Link className="optionButton" to='/profile/edit'>Edit Profile</Link>}
            </div>
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
  }, [id])

  return (
    <>
      <PartialInfoTopPanel />
      {loading && <LoadingSpinner />}
      <div className="centered">
        {!loading && !profile && <Link to='/login'>Log In</Link>}
        <ProfileUI profile={profile} loading={loading} />
      </div>
    </>
  )
}

export default Profile
export {
  ProfileUI
}