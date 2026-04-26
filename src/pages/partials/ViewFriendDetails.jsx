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

const ViewFriendDetails = () => {
  const [profile, setProfile] = useState(null)
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
    <div className="partial">
      <PartialInfoTopPanel />
      <div className="centered">
        <div className='optionButtons'>
          <Link to={`/message/${id}`} className='optionButton'>Message</Link>
          <Link
            className='optionButton'
            onClick={async () => {
              try {
                await deleteFriend(id)
              } catch (err) {
                console.log(err)
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
    </div>
  )
}

export default ViewFriendDetails