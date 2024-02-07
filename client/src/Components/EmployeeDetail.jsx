import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:3000/employee/detail/'+id)
    .then(result => {
      setEmployee(result.data[0]);
    })
    .catch(err => console.log(err))
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
    .then(result=>{
      if(result.data.Status) {
        localStorage.removeItem("valid");
        navigate('/')
      }
    })
    .catch(err=>console.log(err))
  };

  return (
    <div className='d-flex flex-column align-items-center'>
      <div className='d-flex justify-content-center shadow p-2 w-100 '>
        <h4>Employee Management System</h4>
      </div> 
      <div className='w-50 d-flex flex-column align-items-center mt-4'>
        <img src={`http://localhost:3000/Images/` + employee.image} className='emp_det_image'/>
        <div className='d-flex flex-column align-items-center mt-5'>
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: ${employee.salary}</h3>
        </div>
        <div>
          <button className='btn btn-primary me-2'>Edit</button>          
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
      </div>
      
    </div>
  )
}

export default EmployeeDetail