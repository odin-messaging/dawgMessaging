import '../../css/partials.css'
import PartialInfoTopPanel from './partialInfoTopPanel'
import { useEffect, useState } from 'react'
import { sendAllFriendsNotInGroupChat } from '../../fetches/get'
import LoadingSpinner from '../../components/LoadingSpinner'
import DisplayUsers from '../../components/DisplayUsers'
import { useParams } from 'react-router-dom'
import { addFriendToGroupChat } from '../../fetches/post'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../../components/AlertContext'

const ChoseFriendToAddToChat = () => {
  const [friends, setFriends] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()
  const { setAlert } = useAlert()

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

  const addFriend = async (friendId) => {
    try {
      setLoading(true)

      const res = await addFriendToGroupChat(id, friendId)

      if (res.message) {
        setAlert(res?.message || 'Deleted Friend', 'success')
      } else if (res?.error) {
        setAlert(res?.err || 'Failed to add friend', 'error')
      }

      navigate('/message')
    } catch (err) {
      console.log(err)
      setError(err)
      setAlert(res?.err || 'Failed to add friend', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PartialInfoTopPanel />

      {error && <div>{error}</div>}
      {loading && <LoadingSpinner />}
      {friends && friends.length === 0 && <p>You have no friends left that are not already in this chat!</p>}


      {friends && !error && !loading && friends.length > 0 &&

        <>
          <p>Chose Friend you want to add to the group chat</p>
          <DisplayUsers action={addFriend} users={friends} />
        </>
      }
    </>
  )
}

export default ChoseFriendToAddToChat