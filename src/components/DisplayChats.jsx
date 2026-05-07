import { Link } from "react-router-dom"
import DisplayAvatar from "./DisplayAvatar"
import info from '../assets/info.svg'
import Dropdown from "./Dropdown"
import { useState } from "react"

const SingleChat = ({ chat }) => {
  const [openDropdown, setOpenDropdown] = useState(false)


  return (
    <Link className="singleChat" to={`/users/friends/chats/${chat.id}`}>
      <div className="spaceApartFlex">
        <div
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setOpenDropdown(false)
            }
          }}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setOpenDropdown((prev) => !prev)
          }}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              e.target.click()
            }
          }}
          tabIndex={0}
          className="infoContainer"
        >
          <img src={info} alt="more info" />
          {openDropdown &&
            <Dropdown
              links={
                chat.users.map((user) => {
                  return { title: user.username, avatar: user.avatar }
                })
              }
            />
          }
        </div>
      </div>
      <div className="avatars">
        {chat.users.map((user) => (
          <DisplayAvatar key={user.id} style={user.avatar.style} seed={user.avatar.seed} className='listedUserAvatar chatListAvatar' />
        ))}
      </div>
    </Link>
  )
}

const DisplayChats = ({ chats }) => {

  return (
    <div className="friendGrid">
      {chats.map((chat) => (
        <SingleChat key={chat.id} chat={chat} />
      ))}
    </div>
  )
}

export default DisplayChats