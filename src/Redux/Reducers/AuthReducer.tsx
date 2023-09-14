import { auth } from "../Actions/indexAction";

const initialState: auth = {
    userName:'', 
    password: '',  
}

 function authReducer(state : auth = initialState, action : any){
switch(action.type){
    case 'LOGIN': return state = action.payload;
    case 'LOGOUT': localStorage.setItem('isLoggedIn', 'false')
                   return state = initialState;
    default : return state;
}
}

export default authReducer;
