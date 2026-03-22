import '../css/header.css'
import Logo from './logo'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext'

// link format {
// title
// href or action
// }
//

const Header = ({ links }) => {
  const { logoutUser, isAuthenticated } = useAuth()
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
            <button className='headerLink' onClick={() => logoutUser()}>Log Out</button>
            :
            <Link className='headerLink' to={'/login'}>Log In</Link>
          }
        </div>
      </nav>
    </header >
  )
}

export default Header