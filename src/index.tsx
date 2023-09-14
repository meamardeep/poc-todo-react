import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginComponent } from './Components/LoginComponent';
import { RegisterComponent } from './Components/RegisterComponent';
import { DashboardComponent } from './Components/DashboardComponent';
import store from './Redux/Store';
import { Provider } from 'react-redux';
import HocComponent from './Components/HOCComponent';

//showing state of redux console
//store.subscribe(()=>{console.log(store.getState())});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<LoginComponent/>} />
        <Route path='/login' element={<LoginComponent/>} />
        <Route path='/register' element={<RegisterComponent/>} />
        <Route path='/dashboard' element={<HocComponent Component={<DashboardComponent/>} />} />
      </Routes>
    </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
