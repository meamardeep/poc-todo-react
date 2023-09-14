import React, {useContext} from 'react'
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { NewTaskComponent } from './NewTaskComponent';

export function PopupComponent(props:{taskId: number, showPopup:boolean}) {
  console.log(props.taskId, props.showPopup)
  const [show, setShow] = useState(props.showPopup);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className='mt-2 mb-2 d-flex justify-content-end'>
         <button onClick={handleShow} className='btn btn-primary shadow-lg'>+ Add task</button>
      </div>
      <Modal size='lg' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.taskId !== undefined && props.taskId > 0 ? 'Edit task' : 'New task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <NewTaskComponent handleClose={handleClose} />
        </Modal.Body>
        
      </Modal>
    </>
  );
}

