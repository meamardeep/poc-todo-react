import React, { useState } from 'react';
import '../Styles/dashboard.css';
import { HeaderComponent } from './HeaderComponent';
import {PopupComponent} from './PopupComponent';
import { TaskListComponent } from './TaskListComponent';

export const DashboardComponent = () =>{  
  const [show, setShow] = useState(false);
  const [taskId, setTaskId] = useState(0);
  const handleClickShow=()=>{
    setShow(true)
  }
  const editTask=(taskId: number)=>{
    console.log(taskId)
      setTaskId(taskId);
      setShow(true);
  }
  return(
    <> 
      <HeaderComponent/>
      <PopupComponent taskId={taskId} showPopup={show}/>
      <TaskListComponent  editTask={editTask}/>
    </>
  )
}


