import Header from "../components/Header"
import { useEffect, useState } from "react"
import { useAuth } from "../components/AuthContext"
import { Link } from "react-router-dom"
import { isWithinTenMinutes } from "../components/checkOnlineStatus"
import '../css/profile.css'
import AvatarPicker from "../components/choseAvatar"
import { createAvatar } from '@dicebear/core'
import { lorelei, adventurer, bottts, rings } from '@dicebear/collection'
import { updateUser } from "../fetches/patch"
import LoadingSpinner from "../components/LoadingSpinner"
import { useNavigate } from "react-router-dom"

const EditAvatarModal = ({ setOpenAvatarPicker, onAvatarPick }) => {
  return (
    <div className="EditAvatarModalOverlay">
      <AvatarPicker onAvatarPick={onAvatarPick} setOpenAvatarPicker={setOpenAvatarPicker} />
    </div>
  )
}

const EditProfile = () => {
  const AVATAR_STYLES = { adventurer, lorelei, bottts, rings }
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [editedUser, setEditedUser] = useState(user)
  const [openAvatarPicker, setOpenAvatarPicker] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <Header links={[
        { title: 'Home', href: '/' },
        { title: 'Profile', href: `/profile/${user.id}` }
      ]} />

      {openAvatarPicker &&
        <EditAvatarModal
          setOpenAvatarPicker={setOpenAvatarPicker}
          onAvatarPick={(seed, style) => setEditedUser({ ...editedUser, avatar: { ...editedUser.avatar, seed, style } })}
        />}

      {loading && <LoadingSpinner />}
      {!loading && !user && <Link to='/login'>Log In</Link>}
      {!loading && user && editedUser &&
        <>
          <div className="profileOutline">
            <div className="editButtons">
              <button type="button" onClick={async () => {
                setLoading(true)
                try {
                  const updated = await updateUser(editedUser)
                  setUser(updated)
                  navigate(`/profile/${user.id}`, { replace: true })
                } catch (err) {
                  alert(err)
                } finally {
                  setLoading(false)
                }
              }} disabled={JSON.stringify(user) === JSON.stringify(editedUser)}>Save</button>
              <button onClick={() => setEditedUser(user)} disabled={JSON.stringify(user) === JSON.stringify(editedUser)}>Restore</button>
            </div>
            <div className="profileTop">
              <div className="profileTopLeft">
                <img
                  tabIndex={0}
                  className="changeAvatar"
                  src={createAvatar(AVATAR_STYLES[editedUser.avatar.style],
                    { seed: editedUser.avatar.seed, size: 128 }).toDataUri()}
                  onClick={() => setOpenAvatarPicker(!openAvatarPicker)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setOpenAvatarPicker(!openAvatarPicker)
                    }
                  }}
                  alt="User Avatar"
                />
                <input
                  type="text"
                  value={editedUser.username}
                  onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}>
                </input>
              </div>
              <div>{isWithinTenMinutes(user.lastSeen) ?
                <div className="flex"><span>Online</span><div className="onlineStatus online"></div></div>
                :
                <div className="flex"><span>Offline</span><div className="onlineStatus offline"></div></div>}</div>
            </div>
            <hr />
            <textarea
              className="blurb"
              placeholder="A little info about you..."
              name="blurb"
              value={editedUser.blurb}
              onChange={(e) => setEditedUser({ ...editedUser, blurb: e.target.value })}>
            </textarea>
          </div>
        </>
      }
    </>
  )
}

export default EditProfile