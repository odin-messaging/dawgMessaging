import { useState, useEffect } from 'react'
import { getMainPage } from '../fetches/get'
import { useOnlineHeartbeat } from '../components/onlineHeartbeat'
import '../css/globle.css'
import '../css/dropdown.css'
import Header from '../components/Header'
import Logo from '../components/logo'
import { useAuth } from '../components/AuthContext'
import { getAllOtherUsers } from '../fetches/get'

const App = () => {
  const [data, setData] = useState(null)
  const { logoutUser, user } = useAuth()

  useEffect(() => {
    const load = async () => {
      const fetch = await getAllOtherUsers()
      setData(fetch)
    }

    load()
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <Header links={[
        // { title: 'Profile', href: `/profile/${user.id}` }
      ]} />

      <div>
        <h2>Wecome to</h2>
        <Logo size='100' />
      </div>
    </>
  )
}

export default App