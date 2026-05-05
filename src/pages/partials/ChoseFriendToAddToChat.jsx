import '../../css/partials.css'
import PartialInfoTopPanel from './partialInfoTopPanel'
import { useEffect, useState } from 'react'
import { sendAllFriendsNotInGroupChat } from '../../fetches/get'
import LoadingSpinner from '../../components/LoadingSpinner'
import DisplayUsers from '../../components/DisplayUsers'
import { useParams } from 'react-router-dom'

const ChoseFriendToAddToChat = () => {
  const [friends, setFriends] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    const load = async () => {
      try {
        const res = await sendAllFriendsNotInGroupChat(id)
        console.log(res)

        if (res.error) {
          setError(res.error)
        } else {
          setFriends(res)
        }

      } catch (err) {
        setError(err?.message || "Something went wrong")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <>
      <PartialInfoTopPanel />

      {error && <div>{error}</div>}
      {loading && <LoadingSpinner />}
      {friends && friends.length === 0 && <div>You have no friends left that are not already in this chat!</div>}


      {friends && !error && !loading && friends.length > 0 &&

        <>
          <p>Chose Friend you want to add to the group chat</p>
          <DisplayUsers action={alert} users={friends} />
        </>
      }
    </>
  )
}

export default ChoseFriendToAddToChat