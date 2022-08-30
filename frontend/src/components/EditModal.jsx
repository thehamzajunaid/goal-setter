import React from 'react'
import Modal from 'react-modal';
import { useState } from 'react';
import { updateGoal } from '../features/goals/goalSlice';
import { useDispatch } from 'react-redux';



const customStyles = {
  content: {
    width: '400px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const closeButtonStyle = {
  
  marginBottom: '20px',
  marginTop: '0px',
  marginLeft: '0px'
  
}

function EditModal({goal, closeModal, modalIsOpen}) {

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    // e.preventDefault()
    console.log(e.target.value)
    dispatch(updateGoal({id: goal._id,text: text}))
  }

  const [text, setText] = useState(goal.text)
    
  return (
    <><div>
    <Modal
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button onClick={closeModal} style={closeButtonStyle}>close</button>
      <h2>Edit Goal</h2>
      
      <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" name='text' id='text' value={text} onChange={(e) => setText(e.target.value)}/>
            </div>

            <div className="form-group">
                <button className="btn btn-block" type='submit'> Edit Goal</button>
            </div>
        </form>
    </Modal>
  </div></>
  )
}

export default EditModal