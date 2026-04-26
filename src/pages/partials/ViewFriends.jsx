import '../../css/partials.css'
import PartialInfoTopPanel from './partialInfoTopPanel'
import { useEffect, useState } from 'react'
import { getFriends } from '../../fetches/get'
import { lorelei, adventurer, bottts, rings } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import LoadingSpinner from '../../components/LoadingSpinner'
import { Link } from 'react-router-dom'
import { isWithinTenMinutes } from '../../components/checkOnlineStatus'
import DisplayUsers from '../../components/DisplayUsers'

const ViewFriends = () => {
  const [friends, setFriends] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const AVATAR_STYLES = { adventurer, lorelei, bottts, rings }

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
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <>
      <div className='partial'>
        <PartialInfoTopPanel />
        <div className='optionButtons'>
          <Link to={`/message/`} className='optionButton'>Send Friend Request</Link>
        </div>
        {error && <div>{error}</div>}
        {loading && <LoadingSpinner />}
        {friends && friends.length === 0 && <div>You have no friends yet, go out and make some!</div>}


        {friends && !loading && friends.length > 0 &&
          <DisplayUsers users={friends} />
        }
      </div>
    </>
  )
}

export default ViewFriends