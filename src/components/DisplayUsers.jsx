import { useState } from "react"
import Dropdown from "./Dropdown"
import { lorelei, adventurer, bottts, rings } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { isWithinTenMinutes } from "./checkOnlineStatus"

// Seperating User to it's own component so each user can have their own dropdown
const User = ({ user }) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const AVATAR_STYLES = { adventurer, lorelei, bottts, rings }

  return (
    <div
      tabIndex={0}
      onClick={() => setOpenDropdown(!openDropdown)}
      className={`${openDropdown ? 'activeListedUser' : ''} listedUser`}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setOpenDropdown(!openDropdown)
        }
      }}
    >
      {isWithinTenMinutes(user.lastSeen) ?
        <div className="onlineStatusSmall online"></div>
        :
        <div className="onlineStatusSmall offline"></div>}
      <img
        className="listedUserAvatar"
        src={createAvatar(AVATAR_STYLES[user.avatar.style],
          { seed: user.avatar.seed, size: 128 }).toDataUri()}
        alt="User Avatar"
      />
      <div>{user.username}</div>

      {openDropdown && <Dropdown links={[
        { title: 'View Profile', href: `/profile/${user.id}` }
      ]} />}
    </div>
  )
}

// arr of users in obj form
const DisplayUsers = ({ users }) => {

  return (
    <div className="friendGrid">
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  )
}

export default DisplayUsers