import PartialInfoTopPanel from "./partialInfoTopPanel"
import { useParams } from "react-router-dom"
import { useAuth } from "../../components/AuthContext"
import { use, useEffect, useState } from "react"
import { getConversation } from "../../fetches/get"
import sendArrow from '../../assets/send-message.svg'
import { sendMessage } from "../../fetches/post"
import LoadNewIcon from '../../assets/refresh.svg'
import '../../css/partials.css'

const SendMessage = ({ recipientId, setLoadNew }) => {
  const [message, setMessage] = useState("")

  return (
    <>
      <div className="sendMessage">
        <img className="LoadNewIcon" src={LoadNewIcon} alt="" onClick={() => setLoadNew(prev => !prev)} />
        <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" />
        <img onClick={
          async () => {
            try {
              await sendMessage(message, recipientId)
            } catch (err) {
              console.log(err)
            } finally {
              setMessage("")
              setLoadNew(prev => !prev)
            }
          }
        } src={sendArrow} alt="" />
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

  useEffect(() => {
    const loadRecentMessages = async () => {
      console.log(conversation[conversation.length - 1].id + " is last message id")
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
    }

    load()
  }, [id, loadOld])

  return (
    <>
      <div className='partial'>
        <PartialInfoTopPanel />
        <div className='messages'>
          <button className="loadOldMessagesBtn" onClick={() => setLoadOld((prev => !prev))}>load more</button>
          {error && <div>{error}</div>}
          {conversation && conversation.length === 0 && <div className="noConversation">No messages yet</div>}
          {conversation && conversation.map(message => (
            <div key={message.id} className={`message ${message.senderId == user.id ? 'sent' : 'received'}`}>
              {message.message}
            </div>
          ))}
        </div>
        <SendMessage recipientId={id} setLoadNew={setLoadNew} />
      </div>
    </>
  )
}

export default Message