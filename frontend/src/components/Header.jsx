import {Link, useNavigate} from 'react-router-dom'
import {FaSignInAlt, FaUser, FaSignOutAlt} from 'react-icons/fa'
import {logout, reset} from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <>
    <header className="header">
        <div className='logo'>
            <Link to= '/'> GoalSetter</Link>
        </div>
        <ul>
            {user ? (
                <li>
                <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt/> Logout
                </button>
            </li>
            ): (<>
                <li>
                <Link to='Login'>
                    <FaSignInAlt/> Login
                </Link>
            </li>
            <li>
                <Link to='Register'>
                    <FaUser/> Register
                </Link>
            </li></>
            )}
            
        </ul>
    </header>
    </>
    
  )
}

export default Header