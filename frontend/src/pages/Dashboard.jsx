import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import {getGoals} from '../features/goals/goalSlice'
import {reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import GoalItem from '../components/GoalItem'

function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {goals, isLoading, message, isError} = useSelector((state) => state.goals)
  

  useEffect(()=> {
    if (isError){
      console.log(message)
    }

    if (!user){
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [navigate, user, isError, message, dispatch])

  if(isLoading){
    return <Spinner/>
  }

  return (
    <> 
    <section className="heading">
      <h1>Hi, {user && user.name}</h1>
      <p>Create your goals</p>
    </section>
    <GoalForm/>

    <section className="content">
      {goals.length > 0 ? (
        <div className='goals'>
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal}/>
          ))}
        </div>
      ) : (
        <h3>There are no goals</h3>
      )}
    </section>

    </>
  )
}

export default Dashboard