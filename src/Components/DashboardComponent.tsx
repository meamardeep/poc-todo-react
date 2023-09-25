import React, { useState } from 'react';
import '../Styles/dashboard.css';
import { HeaderComponent } from './HeaderComponent';
import {PopupComponent} from './PopupComponent';
import { TaskListComponent } from './TaskListComponent';

export const DashboardComponent = () =>{  
  const [show, setShow] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<number>(0);

  const editTask=(taskId: number)=>{
      setTaskId(taskId);
      setShow(true);
  }
  const handleShow =()=>{
    setTaskId(0);
    setShow(true);
  }
  const handleClose=()=>{
    setShow(false);
  }
  return(
    <> 
      <HeaderComponent/>
      <div className='mt-2 mb-2 d-flex justify-content-end'>
         <button onClick={handleShow} className='btn btn-primary shadow-lg'>+ Add task</button>
      </div>
      {show && <PopupComponent handleClose={handleClose} taskId={taskId} showPopup={show}/>}
      <TaskListComponent editTask={editTask}/>
    </>
  )
}


