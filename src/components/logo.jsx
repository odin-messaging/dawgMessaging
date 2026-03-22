import '../css/header.css';
import { Link } from 'react-router-dom';

// const Logo = ({ height }) => {
//   return (
//     <Link to="/" className='logo' style={{height: `${height}px`}}>
//       <h1>
//         <span className="headerTitleRotate">Dawg</span>
//         <span>Messaging</span>
//       </h1>
//     </Link>
//   )
// }

const Logo = ({ size = 50 }) => (
  <svg
    height={size}
    viewBox="0 0 600 200"
    preserveAspectRatio="xMidYMid meet"
    style={{ display: 'block' }}
  >
    {/* CENTER THE WHOLE LOGO */}
    <g transform="translate(325 100)">
      
      {/* DAWG: rotate first, then offset */}
      <g transform="rotate(-90)">
        <text
          x="10"
          y="-290"                 // 👈 vertical offset AFTER rotation
          fontSize="50"
          fontStyle="oblique"
          fill="#29bbff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Dawg
        </text>
      </g>

      {/* MESSAGING */}
      <text
        x="0"
        y="0"
        fontSize="120"
        fill="#e2e8f0"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        Messaging
      </text>

    </g>
  </svg>
)




export default Logo