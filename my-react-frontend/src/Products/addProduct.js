import React, { useState } from 'react';
import apiClient from '../utils/axiosConfig';
//import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const apiBaseUrl = 'http://localhost:3000';
function AddProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl ,setImageUrl] =useState('');
    const navigate = useNavigate()
    const handleadd = async (e) => {
     e.preventDefault();
     try {
      await apiClient.post(`${apiBaseUrl}/products`, { 
        name,
        description,
        price,
        imageUrl });
     
        alert('Product added  successful!');
        navigate('/products')
    } catch (err) {
      
      console.error(err);
      alert('Could not add product .');
      
      }
    };

return (
    <div>
      <h2>Describe the product here</h2>
      <form onSubmit={handleadd}>
        <input type="string" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="string" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="string" placeholder="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default AddProduct;