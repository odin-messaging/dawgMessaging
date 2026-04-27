import '../../css/partials.css'
import message from '../../assets/message.svg'
import mutiUser from '../../assets/muti-user.svg'
import requests from '../../assets/requests.svg'
import { Link } from 'react-router-dom'
import { useAuth } from '../../components/AuthContext'

const MainPageDefaultOutlet = () => {
  const { user } = useAuth()


  return (
    <>
      <h2>Welcome back, {user.username}!</h2>

      <div className='outletOptions'>
        <Link to='/friends' className='optionCard'>
          <img className='icon' src={mutiUser} alt="" />
          Friends
        </Link>

        <Link to='/message' className='optionCard'>
          <img className='icon' src={message} alt="" />
          Message
        </Link>

        <Link className='optionCard'>
          <img className='icon' src={requests} alt="" />
          Friend Requests
        </Link>
      </div>
    </>
  )
}

export default MainPageDefaultOutlet