import React from 'react';
import {Link} from 'react-router-dom';

const Employee = () => {
  return (
    <div className='mt-3 px-5'>
      <div className='d-flex justify-content-center'>
        <h2>Employee List</h2>
      </div>
      <Link to='/dashboard/add_employee' className='btn btn-success mb-3'>
        Add Employee
      </Link>
    </div>
  )
}

export default Employee;