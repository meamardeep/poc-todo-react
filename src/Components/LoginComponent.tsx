import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import '../Styles/common/form.css'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { auth, login } from "../Redux/Actions/indexAction";
export const LoginComponent = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateUser = (loginData: auth)=>{ 
      let url = 'https://localhost:44310/api/login';
        fetch( url ,{
            method:'post',
            mode:'cors',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData),
        })
        .then((response)=> response.json())
        .then((data)=>{
          if(data.userId > 0)
          {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', data.userId);
            dispatch(login(loginData));
            navigate('/dashboard');
          }
          else{
            navigate('/login');
          }
        })
        .catch((error)=>{console.error(error);
        });
      //const userLoggedIn : any = userList.find((user: userType) => (user.userName === loginData.userName 
       // && user.password === loginData.password));       
    }
    return(
     <>
     <div>
      <h2>Login</h2>
     </div>
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
                <Field className='input' name="password" type="password" />
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