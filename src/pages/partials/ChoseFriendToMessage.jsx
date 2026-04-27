import '../../css/partials.css'
import PartialInfoTopPanel from './partialInfoTopPanel'
import { useEffect, useState } from 'react'
import { getFriends } from '../../fetches/get'
import LoadingSpinner from '../../components/LoadingSpinner'
import DisplayUsers from '../../components/DisplayUsers'

const ChoseFriendToMessage = () => {
  const [friends, setFriends] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const load = async () => {
      try {
        const res = await getFriends()

        if (res.error) {
          setError(res.error)
        } else {
          setFriends(res)
        }

      } catch (err) {
        setError(err?.message || "Something went wrong")
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
      {friends && friends.length === 0 && <div>You have no friends yet, go out and make some!</div>}
      {loading && <LoadingSpinner />}

      {friends && !loading && friends.length > 0 &&
        // id of user is appended onto the link in the component
        <DisplayUsers link={'/message'} users={friends} />
      }
    </>
  )
}

export default ChoseFriendToMessage