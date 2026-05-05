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

  return (
    <>
      <PartialInfoTopPanel />
      <div className="centered">
        <div className='optionButtons'>
          <div
            className='optionButton'
            onClick={async () => {
              try {
                const res = await deleteFriend(id)
                setAlert(res?.message || 'Deleted Friend', 'success')
              } catch (err) {
                console.log(err)
                setAlert(res?.err || 'Failed to delete friend', 'error')
              } finally {
                navigate(-1)
              }
            }}
          >
            Remove Friend
          </div>
        </div>
        {loading && <LoadingSpinner />}

        <ProfileUI profile={profile} loading={loading} />
      </div>
    </>
  )
}

export default ViewFriendDetails