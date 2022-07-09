import {Link} from 'react-router-dom'
import {FaSignInAlt, FaUser} from 'react-icons/fa'

function Header() {
  return (
    <>
    <header className="header">
        <div className='logo'>
            <Link to= '/'> GoalSetter</Link>
        </div>
        <ul>
            <li>
                <Link to='Login'>
                    <FaSignInAlt/> Login
                </Link>
            </li>
            <li>
                <Link to='Register'>
                    <FaUser/> Register
                </Link>
            </li>
        </ul>
    </header>
    </>
    
  )
}

export default Header