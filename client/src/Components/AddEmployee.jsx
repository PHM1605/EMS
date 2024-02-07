import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [categories, setCategories] = useState([]);
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    password: '',
    salary: '',
    address: '',
    category_id: '1',
    image: ''
  });
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:3000/auth/category')
    .then(result => {
      if(result.data.Status) {
        setCategories(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    })
    .catch(err=>console.log(err))
  }, []);
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('image', employee.image);
    formData.append('category_id', employee.category_id);

    axios.post('http://localhost:3000/auth/add_employee', formData)
    .then((result)=>{
      if(result.data.Status) {
        navigate('/dashboard/employee');
      } else {
        alert(result.data.Error);
      }
    })
    .catch(err=>console.log(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <div className='rounded border w-50 p-3 mt-3'>
        <h2>Add Employee</h2>
        <hr/>
        <form onSubmit={handleSubmit}>
          <div className='my-2'>
            <label htmlFor='name' className='form-label'>Name:</label>
            <input type='text' id='inputName' placeholder='Enter Name' 
            className='form-control' 
            onChange={(e)=>setEmployee({...employee, name: e.target.value})}
            />
          </div>
          <div className='my-2'>
            <label htmlFor='inputEmail4' className='form-label'>Email:</label>
            <input type='text' id='inputEmail4' className='form-control' placeholder='Enter Email' autoComplete='false'
            onChange={(e)=>setEmployee({...employee, email: e.target.value})}
            />
          </div>
          <div className='my-2'>
            <label htmlFor='inputPassword4' className='form-label'>Password:</label>
            <input type='password' id="inputPassword4" className='form-control' placeholder='Enter Password'
            onChange={(e)=>setEmployee({...employee, password: e.target.value})}
            />
          </div>
          <div className='my-2'>
            <label htmlFor='inputSalary' className='form-label'>Salary:</label>
            <input type="text" className='form-control' id="inputSalary" autoComplete="off"
            onChange={(e)=>setEmployee({...employee, salary: e.target.value})}
            />
          </div>
          <div className='my-2'>
            <label htmlFor='inputAddress' className='form-label'>Address:</label>
            <input type='text' className='form-control' id="inputAddress" placeholder='Enter Address' autoComplete='off'
            onChange={(e)=>setEmployee({...employee, address: e.target.value})}
            />
          </div>
          <div className='my-2'>
            <label htmlFor='category' className='form-label'>Category:</label>
            <select name='category' id='category' className='form-select'
            onChange={(e)=>setEmployee({...employee, category_id: e.target.value})}
            >
              {categories.map((category)=><option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </div>
          <div className='my-2'>
            <label className="formlabel" htmlFor="inputGroupFile01">Select Image:</label>
            <input type="file" className="form-control rounded-0" id="inputGroupFile01"
            onChange={(e)=> setEmployee({...employee, image: e.target.files[0]})}
            />
          </div>
          <div>
            <button className='btn btn-primary w-100 mt-2'>
              Add Image
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default AddEmployee;