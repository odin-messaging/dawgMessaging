import { useState } from "react"
import Dropdown from "./Dropdown"
import isWithinThreeMinutes from "./checkOnlineStatus"
import { Link } from "react-router-dom"
import DisplayAvatar from "./DisplayAvatar"

const UserWithDropDown = ({ user, dropdown }) => {
  if (!user) return
  const [openDropdown, setOpenDropdown] = useState(false)

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
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setOpenDropdown(false)
        }
      }}
      onClick={() => setOpenDropdown(prev => !prev)}
      className={`${openDropdown ? 'activeListedUser' : ''} listedUser`}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setOpenDropdown(prev => !prev)
        }
      }}
    >
      {isWithinThreeMinutes(user.lastSeen) ?
        <div className="onlineStatusSmall online"></div>
        :
        <div className="onlineStatusSmall offline"></div>}
      <DisplayAvatar style={user.avatar.style} seed={user.avatar.seed} className='listedUserAvatar' />
      <div>{user.username}</div>

      {openDropdown && <Dropdown links={editedDropdown} />}
    </div>
  )
}

const UserWithLink = ({ user, link }) => {
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
      {isWithinThreeMinutes(user.lastSeen) ?
        <div className="onlineStatusSmall online"></div>
        :
        <div className="onlineStatusSmall offline"></div>}
      <DisplayAvatar style={user.avatar.style} seed={user.avatar.seed} className='listedUserAvatar' />
      <div>{user.username}</div>
    </Link>
  )
}

const UserWithAction = ({ user, action }) => {
  return (
    <div
      onClick={() => action(user.id)}
      tabIndex={0}
      className={'listedUser'}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.target.click()
        }
      }}
    >
      {isWithinThreeMinutes(user.lastSeen) ?
        <div className="onlineStatusSmall online"></div>
        :
        <div className="onlineStatusSmall offline"></div>}
      <DisplayAvatar style={user.avatar.style} seed={user.avatar.seed} className='listedUserAvatar' />
      <div>{user.username}</div>
    </div>
  )
}

const User = ({ user }) => {
  return (
    <div className={'listedUser'}>
      {isWithinThreeMinutes(user.lastSeen) ?
        <div className="onlineStatusSmall online"></div>
        :
        <div className="onlineStatusSmall offline"></div>}
      <DisplayAvatar style={user.avatar.style} seed={user.avatar.seed} className='listedUserAvatar' />
      <div>{user.username}</div>
    </div>
  )
}

// arr of users in obj form
const DisplayUsers = ({ users, dropdown, action, link, plainUser }) => {

  return (
    <div className="friendGrid">
      {users && users.map((user) => (
        <div key={user.id}>
          {dropdown ? <UserWithDropDown dropdown={dropdown} user={user} /> :
            link ? <UserWithLink user={user} link={link} /> :
              action ? <UserWithAction user={user} action={action} /> :
                plainUser ? <User user={user} /> :
                  <div>No Props passed!</div>}
        </div>
      ))}
    </div>
  )
}

export default DisplayUsers