import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import {FaUser} from 'react-icons/fa'
import Spinner from '../components/Spinner'
import { reset as goalreset} from '../features/goals/goalSlice'   

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

 
  
  const {email, password} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const {user, isLoading, isError, isSucces, message} = useSelector(
    (state) => 
    state.auth)

  useEffect(() => {
  if (isError){
      toast.error(message)
    }
  
    if(isSucces || user){
      navigate('/')
    }
  
    dispatch(reset())
  
  }, [isError, isSucces, user, message, navigate, dispatch])

  
////////  To clear goals in state when our user logs out and 'user' is deleted from localStorage  ///////
  useEffect( () =>{
    if (!user) {
      dispatch(goalreset())
    }
  })
///////////////
  const onChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if (isLoading){
    return <Spinner/>
  }


  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt/> Login
        </h1>
        <p>Login to your account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
             type="text"
             className='form-control'
             id='email'
             name='email'
             value={email}
             placeholder='Enter your email'
             onChange={onChange} 
             autoComplete='off'
            />
          </div>
          <div className="form-group">
            <input
             type="password"
             className='form-control'
             id='password'
             name='password'
             value={password}
             placeholder='Enter your password'
             onChange={onChange}
             autoComplete='off' 
            />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>Login</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login