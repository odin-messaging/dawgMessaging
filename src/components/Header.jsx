import '../css/header.css'
import Logo from './logo'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { lorelei, adventurer, bottts, rings } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import Dropdown from './Dropdown'
import { useState } from 'react'

// link format {
// title
// href or action
// }
//

const Header = ({ links }) => {
  const { logoutUser, isAuthenticated, user } = useAuth()
  const AVATAR_STYLES = { adventurer, lorelei, bottts, rings }
  const [openDropdown, setOpenDropdown] = useState(false)

  return (
    <header className="header">
      <nav>
        <Logo />
        <div className="headerLinks">
          {links && links.map((link) =>
            link.href ?
              <Link className='headerLink' key={link.title} to={link.href}>{link.title}</Link>
              :
              <button className='headerLink' key={link.title} onClick={() => link.action()}>{link.title}</button>
          )}

          {isAuthenticated ?
            <div className='profileContainer'>
              <img
                tabIndex={0}
                className="headerAvatar"
                src={createAvatar(AVATAR_STYLES[user.avatar.style],
                  { seed: user.avatar.seed, size: 128 }).toDataUri()}
                onClick={() => setOpenDropdown(!openDropdown)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setOpenDropdown(!openDropdown)
                  }
                }}
                alt="User Avatar"
              />
              {openDropdown && <Dropdown links={[
                { title: 'Profile', href: `/profile/${user.id}` },
                { title: 'Log Out', action: () => logoutUser() }
              ]} />}
            </div>
            :
            <Link className='headerLink' to={'/login'}>Log In</Link>
          }
        </div>
      </nav>
    </header >
  )
}

export default Header