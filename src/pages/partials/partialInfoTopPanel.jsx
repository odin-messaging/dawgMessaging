import { useNavigate } from 'react-router-dom'
import '../../css/partials.css'
import arrow from '../../assets/back-arrow.svg'
import backToHomeArrow from '../../assets/back-to-home-arrow.svg'

const PartialInfoTopPanel = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem'}}>
        <img onClick={() => navigate('/')} style={{ cursor: 'pointer' }} className='backArrow' src={backToHomeArrow} alt="go to" />
        <img onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} className='backArrow' src={arrow} alt="go back" />
      </div>
      <hr />
    </div>
  )
}

export default PartialInfoTopPanel