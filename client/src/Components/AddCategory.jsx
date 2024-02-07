import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [category, setCategory] =useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_category', {category})
    .then(result => {
      if(result.data.Status) {
        navigate('/dashboard/category');
      } else {
        alert(result.data.Error);
      }
    })
    .catch(err => console.log(err))
  }
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className='p-3 rounded border w-25'>
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor='category'>Category:</label>
            <input type="text" name='category' placeholder='Enter Category'
            className='form-control rounded-0 mt-1 mb-2'
            onChange={(e)=>setCategory(e.target.value)}
            />
            <button className='btn btn-success w-100 rounded-0 mb-2'>
              Add Category
            </button>
          </div>
        </form>
        
      </div>
    </div>
  )
};

export default AddCategory;