import { stat } from "fs";
import { taskType } from "../Actions/indexAction";   

const initialTask: taskType[] = []

const taskReducer =(state : taskType[] = initialTask, action : any)=>{
   switch(action.type){
    case 'ADD_TASK': //action.payload.taskId = state.length + 1;
                     return [...state, action.payload];
    case 'DEL_TASK': const index = state.findIndex(item=> item.taskId === action.payload)
                     state.splice(index, 1)
                     return [...state];
    case 'EDIT_TASK': const updatedTasks =  state.map((task)=> task.taskId === action.payload.taskId ? 
                                            action.payload : task)
                     state = updatedTasks;
                      return [...state];
    case 'CLEAR_TASK': return state = [];                  
    default: return [...state];
   }
}

export default taskReducer;