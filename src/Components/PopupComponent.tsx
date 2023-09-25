import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { NewTaskComponent } from './NewTaskComponent';
import { taskType } from '../Redux/Actions/indexAction';
import { useSelector } from 'react-redux';

export function PopupComponent(props:{handleClose: () => any, taskId: number, showPopup:boolean,}) {
  const taskList: taskType[] = useSelector((state: any)=> state.taskReducer); 
  const task: taskType | undefined = taskList.find((reduxTask: taskType) => (reduxTask.taskId === props.taskId))
  const taskData = task === undefined ? {taskId:0, title:'', description:'', dueDate:'', priority:'', assignTo:0} :
                        task;
  return (
    <>
      <Modal size='lg' show={props.showPopup} onHide={props.handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.taskId > 0 ?'Edit task:' : 'New task:'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <NewTaskComponent fromProps={taskData} taskIdValue={props.taskId} handleClose={props.handleClose} />
        </Modal.Body>    
      </Modal>
    </>
  );
}

