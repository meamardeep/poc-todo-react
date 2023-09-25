import { useSelector } from 'react-redux';
import { taskType } from '../Redux/Actions/indexAction';
import { FiEdit,FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../Redux/Actions/indexAction';
import { useEffect } from 'react';
import { addTask } from '../Redux/Actions/indexAction';

export const TaskListComponent = (props:{editTask:Function})=>{
    const taskList: taskType[] = useSelector((state: any)=>state.taskReducer)
    console.log(taskList)
    const dispatch = useDispatch();
    
    useEffect(()=>{
      let url = 'https://localhost:44310/api/gettasks';
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
        })
        .catch((error)=>{console.error(error);
        });
    }, [])
    const removeTask =(taskId: number)=>{
      console.log(taskId);
      let url = 'https://localhost:44310/api/deletetask?taskId='+taskId;
        fetch( url ,{
            method:'delete',
            mode:'cors',
            headers:{
                "Content-Type": "application/json"
            },
            //body: JSON.stringify(taskId),
        })
        .then((response)=> response.json())
        .then((data)=>{
          dispatch(deleteTask(taskId));
        })
        .catch((error)=>{console.error(error);
        });
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
               <th>Edit</th>
               <th>Delete</th>
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
                <td>{item.assignTo}</td>
                <td onClick={()=>props.editTask(item.taskId)} style={{cursor:'pointer'}}><FiEdit className=' text-primary'/></td>
                <td onClick={()=>removeTask(item.taskId)}  style={{cursor:'pointer'}}><FiTrash2 className=' text-primary'/></td>    
              </tr>
            ) 
         }
          </tbody>
        </table>
      </div>
    )
}