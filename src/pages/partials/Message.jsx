import PartialInfoTopPanel from "./partialInfoTopPanel"
import { useParams } from "react-router-dom"
import { useAuth } from "../../components/AuthContext"
import { use, useEffect, useState } from "react"
import { getConversation } from "../../fetches/get"
import sendArrow from '../../assets/send-message.svg'
import { sendMessage } from "../../fetches/post"
import LoadNewIcon from '../../assets/refresh.svg'
import '../../css/partials.css'
import LoadingSpinner from "../../components/LoadingSpinner"

const SendMessage = ({ recipientId, setLoadNew }) => {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const messageLoop = async () => {
    setLoading(true)
    try {
      await sendMessage(message, recipientId)
    } catch (err) {
      console.log(err)
    } finally {
      setMessage("")
      setLoadNew(prev => !prev)
      setLoading(false)
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

  useEffect(() => {
    const loadRecentMessages = async () => {
      const res = await getConversation(id, conversation[conversation.length - 1].id, "asc")

      if (res.error) {
        setError(res.error)
        return
      }

      setConversation(prev => [...prev, ...res])
    }

    if (conversation) {
      loadRecentMessages()
    }
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
              <button className="loadOldMessagesBtn" onClick={() => setLoadOld((prev => !prev))}>load more</button>
              {conversation.map(message => (
                <div key={message.id} className={`message ${message.senderId == user.id ? 'sent' : 'received'}`}>
                  {message.message}
                </div>
              ))}
            </>
          }
        </div>
        <SendMessage recipientId={id} setLoadNew={setLoadNew} />
    </>
  )
}

export default Message