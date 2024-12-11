import React, { useEffect, useState } from 'react'
import './Filter.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Filter() {
  const navigate = useNavigate();
  const [categories , setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data); 
      } catch (error) {
        console.error('Error fetching categories:', error.response?.data || error.message);
      }
    };

    fetchCategories();
  }, []);

  
  const categorie = categories.map((data) => {
    const handleRoute = () => {
      navigate(`category/${data.category[0]}`); 
    }
    return (
      <button  key= {data._id} onClick={handleRoute}> {data.category[0]} </button>
    )
  })

  return (
    <div className='filter-container'>
      {categorie} {/* Accessing the first category */}
    </div>
  )
}

export default Filter
