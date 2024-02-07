import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
  const {id} = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "1",
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get("http://localhost:3000/auth/category")
    .then(result =>{
      if(result.data.Status) {
        setCategories(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    })
    .catch(err => console.log(err))

    axios.get('http://localhost:3000/auth/employee/' + id)
    .then((result) => {
      setEmployee({
        ...employee, 
        name: result.data.Result[0].name,
        email: result.data.Result[0].email,
        address: result.data.Result[0].address,
        salary: result.data.Result[0].salary,
        category_id: result.data.Result[0].category_id
      })
    })
    .catch(err => console.log(err))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3000/auth/edit_employee/' + id, employee)
    .then((result)=>{
      if(result.data.Status) {
        navigate('/dashboard/employee');
      } else {
        alert(result.data.Error);
      }
    })
    .catch((err)=> console.log(err))
  }

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div className='border rounded mt-3 w-50 p-3'>
        <h2>Edit Employee</h2>
        <hr/>
        <form onSubmit={handleSubmit}>
          <div className='mt-3'>
            <label htmlFor='name' className='form-label'>Name</label>
            <input type='text' id='name' className='form-control'
            value={employee.name}
            onChange={(e)=>setEmployee({...employee, name: e.target.value})}
            ></input>
          </div>
          <div className='mt-3'>
            <label htmlFor='email' className='form-label'>Email</label>
            <input type='text' id='email' className='form-control' autoComplete='off'
            value={employee.email}
            onChange={(e)=>setEmployee({...employee, email: e.target.value})}
            ></input>
          </div>
          <div className='mt-3'>
            <label htmlFor='salary' className='form-label'>Salary</label>
            <input type='text' id='salary' className='form-control' autoComplete='off'
            value={employee.salary}
            onChange={(e)=>setEmployee({...employee, salary: e.target.value})}
            ></input>
          </div>
          <div className='mt-3'>
            <label htmlFor='address' className='form-label'>Address</label>
            <input type='text' id='address' className='form-control' autoComplete='off'
            value={employee.address}
            onChange={(e)=>setEmployee({...employee, address: e.target.value})}
            ></input>
          </div>
          <div className='mt-3'>
            <label htmlFor='category' className='form-label'>Category</label>
            <select type='text' id='category' className='form-select'
            value={employee.category_id}
            onChange={(e)=>setEmployee({...employee, category_id: e.target.value})}
            >
              {categories.map((category)=>{
                return <option value={category.id}>{category.name}</option>
              })}
            </select>
          </div>
          <div className='mt-3'>
            <button type="submit" className='btn btn-primary w-100'>
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee