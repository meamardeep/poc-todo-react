import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import '../Styles/common/form.css';
import {Link} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/Actions/indexAction";

export const RegisterComponent = ()=>{
  const dispatch = useDispatch();
    return(
           <>
             <Formik 
                  initialValues={{userName:'', password:''}} 
                  validationSchema={Yup.object({
                     userName: Yup.string()
                     .email('Invalid username')
                     .required('Required'),
                     password: Yup.string()
                     .min(4, 'Must be 4 characters or more')
                     .required('Required'),
                  })}          
                  onSubmit={values => {
                     dispatch(addUser(values))
                  }}
                >
                   <Form className="form-center shadow-lg">
                       <h3>Admin page</h3>
                       <div style={{marginBottom:'2rem'}}>
                           <label className="d-flex" htmlFor="userName">UserName:</label>
                           <Field  className='input' name="userName" type="text" />
                            <ErrorMessage  name="userName" />
                        </div>

                        <div style={{marginBottom:'2rem'}}>
                          <label className=" d-flex" htmlFor="password">Password:</label>
                          <Field className='input' name="password" type="text" />
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