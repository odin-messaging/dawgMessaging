import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import '../../css/profile.css'
import { getProfile } from "../../fetches/get"
import { useParams } from "react-router"
import LoadingSpinner from "../../components/LoadingSpinner"
import PartialInfoTopPanel from "./partialInfoTopPanel"
import { ProfileUI } from "../Profile"
import { deleteFriend } from "../../fetches/delete"
import { useNavigate } from "react-router"
import { useAlert } from "../../components/AlertContext"

const ViewFriendDetails = () => {
  const [profile, setProfile] = useState(null)
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { setAlert } = useAlert()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const profile = await getProfile(id)
        setProfile(profile)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  useEffect(() => {
    console.log(profile)
  }, [profile])

  return (
    <>
      <PartialInfoTopPanel />
      <div className="centered">
        <div className='optionButtons'>
          <Link to={`/message/${id}`} className='optionButton'>Message</Link>
          <Link
            className='optionButton'
            onClick={async () => {
              try {
                const res = await deleteFriend(id)
                setAlert(res?.message || 'Deleted Friend', 'success')
              } catch (err) {
                console.log(err)
                setAlert(res?.err || 'Failed to delet friend', 'error')
              } finally {
                navigate(-1)
              }
            }}
          >
            Remove Friend
          </Link>
        </div>
        {loading && <LoadingSpinner />}

        <ProfileUI profile={profile} loading={loading} />
      </div>
    </>
  )
}

export default ViewFriendDetails