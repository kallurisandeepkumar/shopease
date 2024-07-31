import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import apiClient from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import Cart from '../Cart/Cart';

//import apiClient from '../utils/axiosConfig';
const apiBaseUrl = 'http://localhost:3000';


function ProductCatalog() {
  //const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  
 
  //const [promoCode, setPromoCode] = useState('');
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch products from the backend
    
    const fetchProducts = async () => {
      try {
        const res = await apiClient.get(`${apiBaseUrl}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err.response.message.data);
      }
    };

    const fetchCart = async () => {
      try {
          const res = await apiClient.get('/cart'); // Ensure you have a route to get the current user's cart
          setCart(res.data); // Adjust according to the actual cart structure
      } catch (err) {
          console.error('Error fetching cart:', err);
      }
  };
  
   

    fetchProducts();
    fetchCart();
   
  }, []);

  
  const handleAddProduct = () => {
    navigate('/add-products');
  };
  const handleNewPromo =() => {
    navigate('/add-new-promo');
  }
  const handleRefer =()=>{
    navigate('/create-referral');
  }
  const handleAddToCart = async (product) => {
    try {
        const { _id:productId, name, price } = product;
        const quantity = 1; // or a selected quantity by the user
        const res = await apiClient.post('/cart', {  productId ,name, quantity, price });
        console.log(res)
        setCart(res.data);
    } catch (err) {
        console.error('Error adding product to cart:', err);
    }
};

  const handleCheckout = async () => {
    // Placeholder for checkout functionality
    alert('Checkout process to be implemented!');
  };
  const handleRedeem =() =>{
    navigate('/redeem-referral')
  }
  

  return (
    <div>
      <h2>Product Catalog</h2>
      <button onClick={handleAddProduct}>Add Product</button>
      <button onClick={handleNewPromo}>New Promocode</button>
      <button onClick={handleRefer}>Refer a friend</button>
      <button onClick={handleRedeem}>Redeem Referral</button>
      <ul>
        {products.map(product => (
          <li key ={product._id}>
          <Product product={product} handleAddToCart ={handleAddToCart}/> 
          </li>
            
          
        ))}
      </ul>
      
      <Cart cart={cart} setCart={setCart} handleCheckout={handleCheckout} />
    </div>
  );
}

export default ProductCatalog;
