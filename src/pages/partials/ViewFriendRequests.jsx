import { getAllFriendRequests } from "../../fetches/get"
import { useEffect, useState } from "react"
import PartialInfoTopPanel from "./partialInfoTopPanel"
import DisplayUsers from "../../components/DisplayUsers"
import { Link } from "react-router-dom"
import { acceptFriendRequest } from "../../fetches/post"
import { deleteFriendRequest } from "../../fetches/delete"
import refreshIcon from '../../assets/refresh.svg'

const ViewFriendRequests = () => {
  const [myFriendRequests, setMyFriendRequests] = useState(null)
  const [receivedFriendRequests, setReceviedFriendRequests] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showMyMessages, setShowMyMessages] = useState(false)
  const [reloadRequests, setReloadRequests] = useState(false)

  useEffect(() => {
    setLoading(true)
    const loadFriendRequests = async () => {
      try {
        const res = await getAllFriendRequests()
        if (!res) {
          setError('Failed to fetch Friends!')
        } else {
          setMyFriendRequests(res.sentByMe)
          setReceviedFriendRequests(res.sentByOthers)
        }
      } catch (err) {
        setError(err)
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    loadFriendRequests()
  }, [reloadRequests])

  const deleteRequest = async (id) => {
    try {
      await deleteFriendRequest(id)
    } catch (err) {
      console.log(err)
      setError(err)
    } finally {
      setReloadRequests((prev) => !prev)
    }
  }

  const acceptRequest = async (id) => {
    try {
      await acceptFriendRequest(id)
    } catch (err) {
      console.log(err)
      setError(err)
    } finally {
      setReloadRequests((prev) => !prev)
    }
  }

  return (
    <>
      <PartialInfoTopPanel />
      <div className="choseRequests">
        <button onClick={() => setShowMyMessages(true)} className={`${showMyMessages ? 'active' : ''}`}>Sent</button>
        <button onClick={() => setShowMyMessages(false)} className={`${showMyMessages ? '' : 'active'}`}>Received</button>
        <img
          src={refreshIcon}
          onClick={() => setReloadRequests((prev) => !prev)}
          alt="Refresh Requests"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              e.target.click()
            }
          }}
        />
      </div>
      <div className='optionButtons'>
        <Link to={`/friends/request`} className='optionButton'>Send Friend Request</Link>
      </div>

      {myFriendRequests && !loading &&
        <DisplayUsers
          dropdown={[
            { title: 'View Profile', href: `/profile` },
            { title: 'Delete Request', action: deleteRequest },
            !showMyMessages && { title: 'Accept Request', action: acceptRequest }
          ]}
          users={showMyMessages ? myFriendRequests : receivedFriendRequests} />
      }
    </>
  )
}

export default ViewFriendRequests