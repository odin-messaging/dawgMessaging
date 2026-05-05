import { Link } from "react-router-dom"
import DisplayAvatar from "./DisplayAvatar"

const SingleChat = ({ chat }) => {


  return (
    <Link className="singleChat" to={`/users/friends/chats/${chat.id}`}>
      <div>{chat.title}</div>
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