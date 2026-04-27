import { useState } from "react"
import Dropdown from "./Dropdown"
import { lorelei, adventurer, bottts, rings } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { isWithinTenMinutes } from "./checkOnlineStatus"
import { Link } from "react-router-dom"

// Seperating User to it's own component so each user can have their own dropdown
const UserWithDropDown = ({ user, dropdown }) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const AVATAR_STYLES = { adventurer, lorelei, bottts, rings }

  const editedDropdown = dropdown.map((item) => {
    if (item.href) {
      return {
        ...item,
        href: `${item.href}/${user.id}`,
      }
    }
    if (item.action) {
      return {
        ...item,
        action: () => item.action(user.id),
      }
    }

    return item
  })

  return (
    <div
      tabIndex={0}
      onClick={() => setOpenDropdown(prev => !prev)}
      className={`${openDropdown ? 'activeListedUser' : ''} listedUser`}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setOpenDropdown(prev => !prev)
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

      {openDropdown && <Dropdown links={editedDropdown} />}
    </div>
  )
}

const UserWithLink = ({ user, link }) => {
  const AVATAR_STYLES = { adventurer, lorelei, bottts, rings }

  const linkUrl = link + '/' + user.id

  return (
    <Link
      to={linkUrl}
      tabIndex={0}
      className={'listedUser'}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.target.click()
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
    </Link>
  )
}

// arr of users in obj form
const DisplayUsers = ({ users, dropdown, link }) => {

  return (
    <div className="friendGrid">
      {users.map((user) => (
        <div key={user.id}>
          {dropdown ? <UserWithDropDown dropdown={dropdown} user={user} /> :
            link ? <UserWithLink user={user} link={link} /> :
              <div>No Props passed!</div>}
        </div>
      ))}
    </div>
  )
}

export default DisplayUsers