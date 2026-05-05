import PartialInfoTopPanel from "./partialInfoTopPanel"
import { getAllOtherUsersThatAreNotFriends } from "../../fetches/get"
import { useEffect, useState } from "react"
import LoadingSpinner from "../../components/LoadingSpinner"
import DisplayUsers from "../../components/DisplayUsers"
import { sendFriendRequest } from "../../fetches/post"

const SendFriendRequest = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userList, setUserList] = useState(null)
  const [displayedUsers, setDisplayedUsers] = useState(null)
  const [nameSearch, setNameSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    const loadUsersThatAreNotFriends = async () => {
      try {
        const users = await getAllOtherUsersThatAreNotFriends()
        if (!users) {
          setError('Users not loaded!')
        } else {
          setUserList(users)
        }
      } catch (err) {
        console.log(err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadUsersThatAreNotFriends()
  }, [])


  useEffect(() => {
    if (!userList || userList.length === 0) return
    setLoading(true)
    const filteredUserNames = userList.filter((user) => user.username.toLowerCase().includes(nameSearch.toLowerCase()))
    setDisplayedUsers(filteredUserNames)
    setLoading(false)
  }, [nameSearch, userList])

  const updateList = async (friendId) => {
    try {
      setLoading(true)
      await sendFriendRequest(friendId)
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setUserList(await getAllOtherUsersThatAreNotFriends())
      setLoading(false)
    }
  }

  return (
    <>
      <PartialInfoTopPanel />
      {error && !loading && <div>{error}</div>}
      {loading && <LoadingSpinner />}
      {userList && !loading &&
        <>
          <input
            className="nameSearch"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            name="name"
            type="text"
            placeholder="Type username here..." />
          {displayedUsers && <DisplayUsers
            dropdown={[
              { title: 'View Profile', href: `/profile` },
              { title: 'Send Friend Request', action: updateList }
            ]}
            users={displayedUsers} />}
        </>
      }
    </>
  )
}

export default SendFriendRequest