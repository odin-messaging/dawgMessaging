import { useNavigate } from 'react-router-dom'
import '../../css/partials.css'
import arrow from '../../assets/back-arrow.svg'

const PartialInfoTopPanel = () => {
  const navigate = useNavigate()

  return (
    <div>
      <img onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} className='backArrow' src={arrow} alt="go back" />
      <hr />
    </div>
  )
}

export default PartialInfoTopPanel