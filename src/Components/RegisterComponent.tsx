import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import '../Styles/common/form.css';
import {Link} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/Actions/indexAction";

export const RegisterComponent = ()=>{
  const dispatch = useDispatch();
  const saveNewUser = (newUser:any)=>{
        fetch( 'https://localhost:44310/api/' ,{
            method:'post',
            mode:'cors',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then((response)=> response.json())
        .then((data)=>{
            dispatch(addUser({userId: 1, userName: newUser.userName, fullName: newUser.fullName}));
          
        })
        .catch((error)=>{console.error(error);
        });
  }
    return(
           <>
             <Formik 
                  initialValues={{ fullName:'', userName:'', password:''}} 
                  validationSchema={Yup.object({
                    fullName: Yup.string()
                    .required('Enter full name.'),
                     userName: Yup.string()
                     .email('Invalid username.')
                     .required('Required'),
                     password: Yup.string()
                     .min(4, 'Must be 4 characters or more.')
                     .required('Please enter password'),
                  })}          
                  onSubmit={values => {
                    saveNewUser(values);
                  }}
                >
                   <Form className="form-center shadow-lg">
                       <h3>Admin page</h3>
                       <div style={{marginBottom:'2rem'}}>
                           <label className="d-flex" htmlFor="fullName">Full Name:</label>
                           <Field  className='input' name="fullName" type="text" />
                            <ErrorMessage  name="fullName" />
                        </div>
                       <div style={{marginBottom:'2rem'}}>
                           <label className="d-flex" htmlFor="userName">UserName:</label>
                           <Field  className='input' name="userName" type="text" />
                            <ErrorMessage  name="userName" />
                        </div>

                        <div style={{marginBottom:'2rem'}}>
                          <label className=" d-flex" htmlFor="password">Password:</label>
                          <Field className='input' name="password" type="password" />
                          <ErrorMessage className='error' name="password" />
                        </div>

                        <button className="btn btn-primary mt-2" type="submit">Create new user</button>
                        <div>
                          <Link to='/login'>Go back to login</Link>
                        </div>
                    </Form>
                </Formik>
            </>
    );
}