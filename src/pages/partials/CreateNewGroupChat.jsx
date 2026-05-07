import '../../css/partials.css'
import PartialInfoTopPanel from './partialInfoTopPanel'
import { useEffect, useState } from 'react'
import { getFriends } from '../../fetches/get'
import LoadingSpinner from '../../components/LoadingSpinner'
import DisplayUsers from '../../components/DisplayUsers'
import { useAlert } from '../../components/AlertContext'
import { createGroupChat } from '../../fetches/post'
import { useNavigate } from 'react-router-dom'

const CreateNewGroupChat = () => {
  const [friends, setFriends] = useState(null)
  const [originalFriendCount, setOriginalFriendCount] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedFriends, setSelectedFriends] = useState([])
  const { setAlert } = useAlert()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const load = async () => {
      try {
        const res = await getFriends()

        if (res.error) {
          setError(res.error)
        } else {
          setFriends(res)
          console.log(res)
          setOriginalFriendCount(res.length)
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

  const addToSelectedFriendList = (id) => {
    const selected = friends.filter((friend) => friend.id == id)[0]
    if (!selected) return
    const removeFriendFromOptions = friends.filter((friend) => friend.id !== id)
    setFriends(removeFriendFromOptions)
    if (selectedFriends.includes(selected)) {
      setAlert('You can\'t add the same friend twice!', 'error')
      return
    }
    setSelectedFriends((prev) => [...prev, selected])
  }

  const removeFromSelectedFriendList = (id) => {
    const unSelected = selectedFriends.filter((friend) => friend.id == id)[0]
    if (!unSelected) return
    const removeFriendFromOptions = selectedFriends.filter((friend) => friend.id !== id)
    setFriends((prev) => [...prev, unSelected])
    if (friends.includes(unSelected)) {
      setAlert('You can\'t remove the same friend twice!', 'error')
      return
    }
    setSelectedFriends(removeFriendFromOptions)
  }

  return (
    <>
      <PartialInfoTopPanel />
      {friends && friends.length > 0 &&
        <p>
          Please select all friends you would like to add to the group chat!
        </p>
      }
      {error && <p>{error}</p>}
      {loading && <LoadingSpinner />}
      {friends && originalFriendCount == 0 && <p>You have no friends yet, go out and make some!</p>}
      {friends && friends.length === 0 && originalFriendCount !== 0 && <p>You have selected all your friends!</p>}


      {friends && !loading && friends.length > 0 &&
        // id of user is appended onto the action in the component
        <DisplayUsers action={addToSelectedFriendList} users={friends} />
      }

      {selectedFriends && selectedFriends.length !== 0 &&
        <>
          <p>Selected Friends</p>
          <hr />
          <div className="optionButtons">
            <button
              className="optionButton"
              onClick={async () => {
                try {
                  const userIdPayload = selectedFriends.map((friend) => {
                    return { id: friend.id }
                  })
                  if (!userIdPayload) {
                    throw new Error('No user ID payload!')
                  }
                  await createGroupChat(userIdPayload)
                  navigate('/message')
                } catch (err) {
                  setError(err)
                  console.error(err)
                }
              }}
            >
              Create Chat
            </button>
          </div>
          <DisplayUsers users={selectedFriends} action={removeFromSelectedFriendList} />
        </>
      }
    </>
  )
}

export default CreateNewGroupChat