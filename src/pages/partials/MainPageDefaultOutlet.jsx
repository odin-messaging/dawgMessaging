import '../../css/partials.css'
import message from '../../assets/message.svg'
import mutiUser from '../../assets/muti-user.svg'
import requests from '../../assets/requests.svg'
import { Link } from 'react-router-dom'

const MainPageDefaultOutlet = () => {


  return (
    <>
      <div className='partial'>
        main page default
        <hr />

        <div className='outletOptions'>
          <Link className='optionCard'>
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

      </div>
    </>
  )
}

export default MainPageDefaultOutlet