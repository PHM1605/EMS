import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:3000/auth/employee')
    .then((result)=>{
      if(result.data.Status) {
        setEmployees(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    })
    .catch(err => console.log(err))
  }, []);

  const handleDelete = (id) =>{
    axios.delete("http://localhost:3000/auth/delete_employee/" + id)
    .then(result =>{
      if(result.data.Status) {
        window.location.reload();
      } else {
        alert(result.data.Error);
      }
    })
  }

  return (
    <div className='mt-3 px-5'>
      <div className='d-flex justify-content-center'>
        <h2>Employee List</h2>
      </div>
      <Link to='/dashboard/add_employee' className='btn btn-success mb-3'>
        Add Employee
      </Link>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              employees.map(employee=>(
                <tr>
                  <td>{employee.name}</td>
                  <td><img alt='' src={`http://localhost:3000/Images/` + employee.image} className="employee_image"/></td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <Link to={`/dashboard/edit_employee/`+employee.id} className='btn btn-info btn-sm me-2'>Edit</Link>
                    <button className='btn btn-warning btn-sm'
                    onClick={()=>handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee;