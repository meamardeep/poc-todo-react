import { useSelector } from 'react-redux';
import { addUser, taskType, userType } from '../Redux/Actions/indexAction';
import { FiEdit,FiTrash2 } from 'react-icons/fi';
import {MdCancel} from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { deleteTask, cancelTaskAction } from '../Redux/Actions/indexAction';
import { useEffect } from 'react';
import { addTask } from '../Redux/Actions/indexAction';

export const TaskListComponent = (props:{editTask:Function})=>{
    const taskList: taskType[] = useSelector((state: any)=>state.taskReducer)
    const dispatch = useDispatch();
    
    useEffect(()=>{
      const userId = localStorage.getItem('userId');
      let url = 'https://localhost:44310/api/gettasks/'+userId;
        fetch( url ,{
            method:'get',
            mode:'cors',
            headers:{
                "Content-Type": "application/json"
            },
        })
        .then((response)=> response.json())
        .then((data)=>{
          data.forEach((element:taskType) => {
            dispatch(addTask(element));
          });  
          getUserList();        
        })
        .catch((error)=>{console.error(error);
        });
    }, [])

    const getUserList =()=>{
      const userId = localStorage.getItem('userId');
      let url = 'https://localhost:44310/api/getUsers/'+userId;
        fetch( url ,{
            method:'get',
            mode:'cors',
            headers:{
                "Content-Type": "application/json"
            },
        })
        .then((response)=> response.json())
        .then((data)=>{
          data.forEach((user:userType) => {
            dispatch(addUser(user))
          });
        })
        .catch((error)=>{console.error(error);
        });
    }
    const removeTask =(taskId: number)=>{
      let url = 'https://localhost:44310/api/deletetask?taskId='+taskId;
        fetch( url ,{
            method:'delete',
            mode:'cors',
            headers:{
                "Content-Type": "application/json"
            },
        })
        .then((response)=> response.json())
        .then((data)=>{
          dispatch(deleteTask(taskId));
        })
        .catch((error)=>{console.error(error);
        });
    }
    
    const cancelTask = (taskId: number)=>{
      dispatch(cancelTaskAction(taskId));
    }
    return(
        <div className=' bg-light-subtle shadow-lg'>
         <h5 className='pt-2 px-4 d-flex '>Task assigned:</h5>
         
         <table className='table table-striped'>
           <thead>
              <tr>
                <th>Title</th>
               <th>Description</th>
               <th>Due date</th>
               <th>Priority</th>
               <th>Assigned to</th>
               <th>Created by</th>
               <th>Edit</th>
               <th>Delete</th>
               <th></th>
             </tr>
          </thead>
          <tbody>
          { 
            taskList.map((item:taskType,index:number) => 
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.dueDate}</td>
                <td>{item.priority}</td>
                <td>{item.assignToName}</td>
                <td>{item.createdByName}</td>
                <td title='Edit' onClick={()=>props.editTask(item.taskId)} style={{cursor:'pointer'}}><FiEdit className=' text-primary'/></td>
                <td title='Delete' onClick={()=>removeTask(item.taskId)}  style={{cursor:'pointer'}}><FiTrash2 className=' text-danger'/></td> 
                <td title='Cancel' onClick={()=>cancelTask(item.taskId)}  style={{cursor:'pointer'}}><MdCancel className=' text-danger'/></td>       
              </tr>
            ) 
         }
          </tbody>
        </table>
      </div>
    )
}