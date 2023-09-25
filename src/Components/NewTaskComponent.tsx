import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { addTask, editTask, userType, taskType } from "../Redux/Actions/indexAction";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

export interface taskCoponentProps{
  fromProps: taskType,
  taskIdValue?: number,
   handleClose:()=>any
}
export const NewTaskComponent =(props: taskCoponentProps)=>{
  const dispatch = useDispatch();
  const userList : userType[] = useSelector((state :any) => state.userReducer);
  const saveTaskInDB =(task:taskType)=>{
    let url = 'https://localhost:44310/api/savetask';
    fetch( url ,{
        method:'post',
        mode:'cors',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task),
    })
    .then((response)=> response.json())
    .then((data)=>{
      if(!(task.taskId > 0)){
        dispatch(addTask(task));
      }
      else{
        dispatch(editTask(task));
      }
    })
    .catch((error)=>{alert(error);
    });
  }
  return(
        <>
        <Formik 
           initialValues ={{ ...props.fromProps}}
            validationSchema={Yup.object({
            title: Yup.string()
              .min(1,'Invalid title')
              .required('Enter title'),

              description: Yup.string()
              .min(2, 'Must be 5 characters or more')
              .required('Enter task description'),

              dueDate: Yup.string()
              .required('Enter due date'),

              priority: Yup.string()
              .required('Select priority'),

              assignTo: Yup.string()
              .required('Select assign to')
             })}          
          onSubmit={(values, {resetForm}) => {
            saveTaskInDB(values)

            resetForm({values:{ taskId:0, title:'', description:'', dueDate:'', priority:'', assignTo:0}})
            props.handleClose();
          }}
        >
          <Form className=''>

            <div className='mb-2 d-flex flex-row justify-content-around'>
              <Field type='hidden' name='taskId' />
              <div className='mt-3 mb-2 w-100'>
                 <label htmlFor="title">Task title:</label>
                 <Field  className='input' name="title" type="text" />
                 <ErrorMessage  name="title" />
              </div>

              <div className='mt-3 mb-2 w-100'>
                <label htmlFor="description">Description:</label>
                <Field className='input' name="description" type="text" />
                <ErrorMessage className='error' name="description" />
              </div>
            </div>
              
            <div className='d-flex flex-row justify-content-around'>
              <div className=' mb-2 w-100'>
                   <label htmlFor="dueDate">Due Date:</label>
                   <Field className='input' name="dueDate" type="date" />
                   <ErrorMessage className='error' name="dueDate" />
              </div>
            
               <div className=' mb-2 w-100'>
                    <label htmlFor="priority">Priority:</label>
                    <Field className='input' as='select' name="priority">
                         <option value=''>--Select priority--</option>
                         <option value="Low">Low</option>
                         <option value="Medium">Medium</option>
                         <option value="High">High</option>
                     </Field>
                     <ErrorMessage className='error' name="priority" />
                </div>
            </div>
            
             <div className='d-flex flex-row justify-content-around mb-2'>
                  <div className=' mb-3'>
                       <label htmlFor="assignTo">Assign to:</label>
                       <Field className='input' as='select' name="assignTo" >
                             <option value=''>--Select assign to--</option>
                             {
                              userList.map((item, index)=>{
                                return <option key={index} value={item.userId}>{item.userName}</option>
                              })
                             }
                        </Field>
                        <ErrorMessage className='error' name="assignTo" />
                  </div>
              </div>

                  <Modal.Footer>
                      <Button variant="secondary" onClick={()=>props.handleClose()}>Close</Button>
                      <Button className="btn btn-primary shadow-lg mb-3" type="submit">Save task</Button>   
                   </Modal.Footer>
                   
          </Form>
       </Formik>
        </>
    )
}