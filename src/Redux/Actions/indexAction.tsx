
export interface auth{
    userName:string,
    password:string
} 
export interface userType{
    userId: number,
    userName:string,
    fullName:string
}
export interface taskType {
    taskId: number,
    title: string,
    description : string,
    dueDate : string,
    priority : string,
    assignTo : number,
    assignToName: string,
    createdBy: number,
    createdByName: string
}
export const addUser=(user: userType)=>{
    return {
        type: 'ADD_USER',
        payload: user
    }
}
export const clearUser = ()=>{
    return{
        type: 'CLEAR_USER'
    }
}
export const login =(data: auth)=>{
    return {
        type : 'LOGIN',
        payload : data
    }
}

export const logOut =()=>{
    return {
        type : 'LOGOUT'
    }
}

export const addTask =(newTask: taskType)=>{
    return {
        type : 'ADD_TASK',
        payload: newTask
    }
}

export const deleteTask =(index: number)=>{
    return {
        type : 'DEL_TASK',
        payload: index
    }
}

export const cancelTaskAction =(taskId: number)=>{
    fetch( 'https://localhost:44310/api/canceltask?taskId='+taskId ,{
            method:'put',
            mode:'cors',
            headers:{
                "Content-Type": "application/json"
            },
        })
        .then((response)=> response.json())
        .then((data)=>{
            
        })
        .catch((error)=>{console.error(error);
        });
        
    return {
        type : 'DEL_TASK',
        payload: taskId
    }
}

export const editTask = (taskTobeEdited: taskType)=>{
   return{
     type: 'EDIT_TASK',
     payload: taskTobeEdited
   }
}

export const clearTask = ()=>{
    return{
        type: 'CLEAR_TASK'
    }
}
