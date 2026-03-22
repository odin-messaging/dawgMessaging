import Header from "../components/Header"
import { useEffect, useState } from "react"
import { useAuth } from "../components/AuthContext"
import { Link } from "react-router-dom"
import { isWithinTenMinutes } from "../components/checkOnlineStatus"
import '../css/profile.css'
import AvatarPicker from "../components/choseAvatar"
import { createAvatar } from '@dicebear/core'
import { lorelei, adventurer, bottts, rings } from '@dicebear/collection'

const EditAvatarModal = ({ setOpenAvatarPicker, onAvatarPick }) => {
  return (
    <div className="EditAvatarModalOverlay">
      <AvatarPicker onAvatarPick={onAvatarPick} setOpenAvatarPicker={setOpenAvatarPicker} />
    </div>
  )
}

const EditProfile = () => {
  const AVATAR_STYLES = { adventurer, lorelei, bottts, rings }
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [editedUser, setEditedUser] = useState(user)
  const [openAvatarPicker, setOpenAvatarPicker] = useState(false)

  useEffect(() => {
    console.log(editedUser)
  }, [editedUser])

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


      {!user && <Link to='/login'>Log In</Link>}
      {user && editedUser &&
        <>
          <div className="profileOutline">
            <div className="editButtons">
              <button disabled={JSON.stringify(user) === JSON.stringify(editedUser)}>Save</button>
              <button onClick={() => setEditedUser(user)} disabled={JSON.stringify(user) === JSON.stringify(editedUser)}>Restore</button>
            </div>
            <div className="profileTop">
              <div className="profileTopLeft">
                <img
                  className="changeAvatar"
                  src={createAvatar(AVATAR_STYLES[editedUser.avatar.style],
                    { seed: editedUser.avatar.seed, size: 128 }).toDataUri()}
                  onClick={() => setOpenAvatarPicker(!openAvatarPicker)}
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