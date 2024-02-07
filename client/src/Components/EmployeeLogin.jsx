import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeLogin = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/employee/employee_login', values)
    .then(result =>{
      if(result.data.loginStatus) {
        navigate('/employee_detail/' + result.data.id);
      } else {
        setError(result.data.Error);
      }
    })
    .catch((error)=>console.log(error))
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="w-25  border rounded p-3 loginForm">
        <div className='text-warning'>
          {error && error}
        </div>
        <h2>
          Employee Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mt-2'>
            <label htmlFor='email'>Email:</label>
            <input type='text' placeholder='Enter Email' id='email' className='form-control'
            onChange={(e)=>setValues({...values, email: e.target.value})}
            ></input>
          </div>
          <div className='mt-2'>
            <label htmlFor='password'>Password:</label>
            <input type='password' placeholder='Enter Password' id='password' className='form-control'
            onChange={(e)=>setValues({...values, password: e.target.value})}
            ></input>
          </div>
          <div className='mt-4'>
            <button className='btn btn-success w-100'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmployeeLogin