import PartialInfoTopPanel from "./partialInfoTopPanel"
import { useParams } from "react-router-dom"
import { useAuth } from "../../components/AuthContext"
import { useEffect, useState } from "react"
import { getConversation } from "../../fetches/get"
import sendArrow from '../../assets/send-message.svg'
import { sendMessage } from "../../fetches/post"
import LoadNewIcon from '../../assets/refresh.svg'
import '../../css/partials.css'
import LoadingSpinner from "../../components/LoadingSpinner"
import DisplayAvatar from "../../components/DisplayAvatar"
import { Link } from "react-router-dom"
import { leaveGroupChat } from "../../fetches/patch"
import { useNavigate } from "react-router-dom"



const SendMessage = ({ recipientId, setLoadNew }) => {
  const [message, setMessage] = useState("")

  const messageLoop = async () => {
    try {
      await sendMessage(message, recipientId)
    } catch (err) {
      console.log(err)
    } finally {
      setMessage("")
      setLoadNew(prev => !prev)
    }
  }

  return (
    <>
      <div className="sendMessage">
        <img
          className="LoadNewIcon"
          src={LoadNewIcon}
          alt="refresh messages"
          onClick={() => setLoadNew(prev => !prev)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.target.click()
            }
          }}
        />
        <input
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              await messageLoop()
            }
          }}
        />
        < img
          onClick={async () => await messageLoop()}
          src={sendArrow}
          alt="send message"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.target.click()
            }
          }}
        />
      </div>
    </>
  )
}

const Message = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [conversation, setConversation] = useState(null)
  const [error, setError] = useState(null)
  const [loadNew, setLoadNew] = useState(false)
  const [loadOld, setLoadOld] = useState(false)
  const [lastMessageId, setLastMessageId] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!conversation) return
    const loadRecentMessages = async () => {
      const lastId = conversation.length
        ? conversation[conversation.length - 1].id
        : 0

      const res = await getConversation(id, lastId, "asc")

      if (res.error) {
        setError(res.error)
        return
      }

      setConversation(prev => [...prev, ...res])
    }

    loadRecentMessages()
  }, [loadNew])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await getConversation(id, lastMessageId, "desc")

        if (res.error) {
          setError(res.error)
          return
        }

        setConversation(prev =>
          lastMessageId ? [...res, ...(prev || [])] : res
        )

        if (res.length > 0) {
          setLastMessageId(res[0].id)
        }
      } catch (error) {
        console.error(error)
        setError(error.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id, loadOld])

  return (
    <>
      <PartialInfoTopPanel />
      <div className='messages'>
        {loading && <LoadingSpinner />}
        {error && <div>{error}</div>}
        {conversation && conversation.length === 0 && <div className="noConversation">No messages yet</div>}
        {conversation && conversation.length !== 0 &&
          <>
            <div className="messagingOptions">
              <button className="loadOldMessagesBtn" onClick={() => setLoadOld((prev => !prev))}>load more</button>
              <Link to={`/friends/chat/add/${id}`} className="optionButton">Add Friend To Chat</Link>
              <button
                className="optionButton"
                onClick={async () => {
                  try {
                    setLoading(true)
                    await leaveGroupChat(id)
                    
                    navigate('/')
                  } catch (err) {
                    setError(err)
                    console.log(err)
                  } finally {
                    setLoading(false)
                  }
                }}
              >
                Leave Chat
              </button>
            </div>
            <hr />
            {conversation.map(message => (
              <RenderSingleMessage key={message.id} message={message} id={user.id} />
            ))}
          </>
        }
      </div>
      <SendMessage recipientId={id} setLoadNew={setLoadNew} />
    </>
  )
}

const RenderSingleMessage = ({ message, id }) => {
  const [showDateSent, setShowDateSent] = useState(false)

  return (
    <div
      onClick={() => setShowDateSent((prev) => !prev)}
      className={`messageWrapper ${message.sender.id == id ? 'sent' : 'received'}`}
    >
      {showDateSent && <div className="details">
        <span className="date">{formatMessageDate(message.dateSent)}</span>
        <span className="username">@{message.sender.username}</span>
      </div>}
      <div className="flex">
        {message.sender.id !== id &&
          <DisplayAvatar
            key={message.sender.id}
            style={message.sender.avatar.style}
            seed={message.sender.avatar.seed}
            className='listedUserAvatar chatListAvatar'
          />}
        <div className={`message ${message.sender.id == id ? 'sent' : 'received'}`}>
          <span className="text">{message.message}</span>
        </div>
      </div>
    </div>
  )
}

function formatMessageDate(dateSent) {
  const date = new Date(dateSent.replace(' ', 'T'))

  const minutes = date.getMinutes()

  const time = minutes === 0
    ? date.toLocaleString('en-US', { hour: 'numeric', hour12: true })
    : date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  const day = date.toLocaleString('en-US', { month: 'short', day: 'numeric' })

  return `${day} at ${time}`
}

export default Message