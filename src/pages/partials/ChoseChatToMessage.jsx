import '../../css/partials.css'
import PartialInfoTopPanel from './partialInfoTopPanel'
import { useEffect, useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'
import DisplayChats from '../../components/DisplayChats'
import { getUserChats } from '../../fetches/get'
import { Link } from 'react-router-dom'

const ChoseChatToMessage = () => {
  const [chats, setChats] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    const loadChats = async () => {
      try {
        setLoading(true)
        const res = await getUserChats()
        if (res.error) {
          setError(res.error)
        } else {
          setChats(res)
        }
      } catch (err) {
        console.error(err)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    loadChats()
  }, [])

  return (
    <>
      <PartialInfoTopPanel />
      <div className="optionButtons">
        <Link to='/users/friends/chats/create' className="optionButton">Create new chat</Link>
      </div>
      {error && <div>{error}</div>}
      {chats && chats.length === 0 && <p>You have no chats yet, go make some!</p>}
      {loading && <LoadingSpinner />}

      {chats && !loading && chats.length > 0 &&
        <DisplayChats chats={chats} />
      }
    </>
  )
}

export default ChoseChatToMessage