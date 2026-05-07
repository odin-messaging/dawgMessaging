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
    if (!userList || userList.length === 0) {
      setDisplayedUsers([])
      setLoading(false)
      return
    }
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
      const newList = userList.filter((user) => user.id !== friendId)
      setUserList(newList)
      setLoading(false)
    }
  }

  return (
    <>
      <PartialInfoTopPanel />
      {error && !loading && <div>{error}</div>}
      {loading && <LoadingSpinner />}
      {userList && userList.length === 0 && <p>No users left to send a request to!</p>}
      {userList && userList.length > 0 && !loading &&
        <>
          <input
            className="nameSearch"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            name="name"
            type="text"
            placeholder="Type username here..." />
          {displayedUsers && displayedUsers.length > 0 && <DisplayUsers
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