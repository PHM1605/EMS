import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(()=>{
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  })

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result => {
      if(result.data.Status) {
        setAdminTotal(result.data.Result[0].adminCount)
      } else {
        alert(result.data.Error);
      }
    })
    .catch(err=>console.log(err));
  }

  const adminRecords = () =>{
    axios.get('http://localhost:3000/auth/admin_records')
    .then(result=>{
      if(result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    })
  }

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result=>{
      if(result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employeeCount)
      } else {
        alert(result.data.Error);
      }
    })
    .catch(err=>console.log(err))
  };

  const salaryCount = () =>{
    axios.get('http://localhost:3000/auth/salary_total')
    .then(result=>{
      if(result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryTotal)
      } else {
        alert(result.data.Error);
      }
    })
    .catch(err=>console.log(err));
  };

  return (
    <>
    <div className='d-flex justify-content-around w-100'>
      <div className='p-3 border rounded m-3 w-25'>
        <h4 className='text-center'>Admin</h4>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5>{adminTotal}</h5>
        </div>
      </div>
      <div className='p-3 border rounded m-3 w-25'>
        
        <h4 className='text-center'>Employee</h4>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5>{employeeTotal}</h5>
        </div>
        
      </div>
      <div className='p-3 border rounded m-3 w-25'>
        <h4 className='text-center'>Salary</h4>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total: </h5>
          <h5>${salaryTotal}</h5>
        </div>  
      </div>
    </div>
    <div className='mt-3'>
      <h3>List of Admins</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            admins.map(admin=>{
              return <tr>
                <td>{admin.email}</td>
                <td>
                  <button className='btn btn-info me-2 '>Edit</button>
                  <button className='btn btn-warning'>Delete</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  </>
    
  )
};

export default Home;