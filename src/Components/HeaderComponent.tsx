import { useSelector, useDispatch } from "react-redux";
import { logOut, clearTask, clearUser } from '../Redux/Actions/indexAction';
import { useNavigate } from 'react-router-dom';

export const HeaderComponent =()=>{
    const loggedUser: any = useSelector((state: any)=> state.authReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout(){
        dispatch(logOut())
        dispatch(clearTask())
        dispatch(clearUser())
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userId')
        navigate('/login')
     }
    return(
        <>
          <div className='bg-secondary d-flex justify-content-end'>
              <p>{loggedUser.userName}</p>  
              <button className='btn btn-primary' onClick={()=>logout()}>Logout</button>
          </div>
        </>
    )
}