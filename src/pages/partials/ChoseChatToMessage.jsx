import '../../css/partials.css'
import PartialInfoTopPanel from './partialInfoTopPanel'
import { useEffect, useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'
import DisplayChats from '../../components/DisplayChats'
import { getUserChats } from '../../fetches/get'

const ChoseFriendToMessage = () => {
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
      {error && <div>{error}</div>}
      {chats && chats.length === 0 && <div>You have no chats yet, go make some!</div>}
      {loading && <LoadingSpinner />}

      {chats && !loading && chats.length > 0 &&
        <DisplayChats chats={chats} />
      }
    </>
  )
}

export default ChoseFriendToMessage