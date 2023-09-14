import { useSelector } from 'react-redux';
import { taskType } from '../Redux/Actions/indexAction';
import { FiEdit,FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../Redux/Actions/indexAction';

export const TaskListComponent = (props:{editTask:any})=>{
    const taskList: taskType[] = useSelector((state: any)=>state.taskReducer)
    const dispatch = useDispatch();
    
    const removeTask =(taskId: number)=>{
      dispatch(deleteTask(taskId));
    }

    return(
        <div className=' bg-light-subtle shadow-lg'>
         <h5 className='pt-2 px-4 d-flex '>Task assigned:</h5>
         
         <table className=' table table-striped'>
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
            taskList.map((item:taskType,index:number) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.dueDate}</td>
                <td>{item.priority}</td>
                <td>{item.assignTo}</td>
                <td onClick={props.editTask(1)} style={{cursor:'pointer'}}><FiEdit className=' text-primary'/></td>
                <td onClick={()=>removeTask(index)}  style={{cursor:'pointer'}}><FiTrash2 className=' text-primary'/></td>
                
                </tr>
            )) 
        }
          </tbody>
        </table>
      </div>
    )
}