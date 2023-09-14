import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import '../Styles/common/form.css'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { auth, login, userType } from "../Redux/Actions/indexAction";
import { useSelector } from "react-redux";
export const LoginComponent = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userList : userType[] = useSelector((state :any) => state.userReducer)

    const validateUser = (loginData: auth)=>{ 
      const userLoggedIn : any = userList.find((user: userType) => (user.userName === loginData.userName 
        && user.password === loginData.password));

        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
        dispatch(login(loginData));
       
    }
    return(
     <>
     <div style={{display:'flex', justifyContent:'center',alignContent:'center'}}>
       <Formik 
          initialValues={{ userName:'', password:''}} 
          validationSchema={Yup.object({
            userName: Yup.string()
              .email('Invalid username')
              .required('Required'),
            password: Yup.string()
              .min(4, 'Must be 4 characters and more ')
              .required('Required'),
          })}          
          onSubmit={values => {
              validateUser(values);
          }}
        >
          <Form className="form-center shadow-lg">
          <h2>User login</h2>
            <div >
              <div className="mb-3 d-flex flex-column">
                 <label className=" d-flex" htmlFor="userName">UserName:</label>
                 <Field  className='input' name="userName" type="text" />
                 <ErrorMessage  name="userName" />
              </div>
              <div className="mb-3 d-flex flex-column">
                <label className=" d-flex" htmlFor="password">Password:</label>
                <Field className='input' name="password" type="text" />
                <ErrorMessage className='error' name="password" />
              </div>

              <button className="btn btn-primary mb-3" type="submit">Login</button>
              <div>
              <Link to='/register'>Create new account</Link>
              </div>
            </div>
              
          </Form>
       </Formik>
     </div>
      
</>
    );
}