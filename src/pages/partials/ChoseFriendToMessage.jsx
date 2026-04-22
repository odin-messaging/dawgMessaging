import '../../css/partials.css'
import PartialInfoTopPanel from './partialInfoTopPanel'
import { useEffect, useState } from 'react'
import { getFriends } from '../../fetches/get'
import { lorelei, adventurer, bottts, rings } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import LoadingSpinner from '../../components/LoadingSpinner'
import { Link } from 'react-router-dom'

const ChoseFriendToMessage = () => {
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
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  useEffect(() => {
    console.log(friends)
  }, [friends])

  return (
    <>
      <div className='partial'>
        <PartialInfoTopPanel />
        {error && <div>{error}</div>}
        {loading && <LoadingSpinner />}


        <div className='friendList'>
          {friends && friends.map((friend) => (
            <Link to={`/message/${friend.id}`} key={friend.id} className='listedUser listedFriend'>
              <img
                tabIndex={0}
                className="listedUserAvatar"
                src={createAvatar(AVATAR_STYLES[friend.avatar.style],
                  { seed: friend.avatar.seed, size: 128 }).toDataUri()}
                alt="friend"
              />
              <span>{friend.username}</span>
            </Link>
          ))}
        </div>


      </div>
    </>
  )
}

export default ChoseFriendToMessage