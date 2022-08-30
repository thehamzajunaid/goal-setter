import { useDispatch } from "react-redux"
import { useState } from 'react';
import { deleteGoal } from '../features/goals/goalSlice'
import EditModal from "./EditModal";

function GoalItem({goal}) {

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

    const dispatch = useDispatch()

  return (
    <div className="goal">
        <div>{new Date(goal.createdAt).toLocaleString
        ('en-US')}</div>
        <h2>{goal.text}</h2>
        <button onClick={() => {dispatch(deleteGoal(goal._id))}} className='close'>X</button>
        <div style={{textAlign: 'center'}} >
        <button className="editBtn" onClick={openModal}>Edit Goal</button>
        </div>
        
        <div>
          <EditModal goal={goal} closeModal={closeModal} modalIsOpen={modalIsOpen}/>
        </div>
    </div>
  )
}

export default GoalItem