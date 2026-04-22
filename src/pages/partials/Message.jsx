import PartialInfoTopPanel from "./partialInfoTopPanel"
import { useParams } from "react-router-dom"
import { useAuth } from "../../components/AuthContext"

const Message = () => {
  const { id } = useParams()
  const { user } = useAuth()

  const messages = [
    { id: 4, senderId: 15, reciverId: 14, text: "yo im 67 what up!" },
    { id: 1, senderId: 14, reciverId: 15, text: "H!" },
    { id: 2, senderId: 15, reciverId: 14, text: "E!" },
    { id: 3, senderId: 14, reciverId: 15, text: "L!" },
    { id: 4, senderId: 15, reciverId: 14, text: "L!" },
    { id: 5, senderId: 14, reciverId: 15, text: "O!" },
  ]

  return (
    <>
      <div className='partial'>
        <PartialInfoTopPanel />
        <div className='messages'>
          {messages && messages.map(message => (
            <div key={message.id} className={`message ${message.senderId == user.id ? 'sent' : 'received'}`}>
              {message.text}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Message