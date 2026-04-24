import { useState, useEffect } from "react"
import Dropdown from "./Dropdown"
import { lorelei, adventurer, bottts, rings } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'

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

  // Seperating User to it's own component so each user can have their own dropdown
  return (
    <div className="userList">
      <div className="legend">Users</div>
      <hr />
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  )
}

export default DisplayUsers