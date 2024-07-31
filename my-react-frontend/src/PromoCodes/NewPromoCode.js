import React, { useState } from 'react';
import apiClient from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

function NewPromoCode() {
  const [code, setCode] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [usageLimit, setUsageLimit] = useState('');
  const [usedCount, setUsedCount] = useState('0'); // Defaulting to 0 as it's a new promo
  const [applicableProducts, setApplicableProducts] = useState('');
  const [minimumPurchase, setMinimumPurchase] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [allowedUsers, setAllowedUsers] = useState('');
  const navigate = useNavigate();

  const handleNew = async (e) => {
    e.preventDefault();
    const payload = {
      code,
      type,
      value: Number(value),
      expiryDate,
      usageLimit: Number(usageLimit),
      usedCount: Number(usedCount),
      applicableProducts: applicableProducts.split(',').map(product => product.trim()).filter(product => product !==""), // Assuming comma-separated input
      minimumPurchase: Number(minimumPurchase),
      maxDiscount: Number(maxDiscount),
      allowedUsers: allowedUsers.split(',').map(user => user.trim()).filter(user => user !=="") // Assuming comma-separated user IDs
    };

    try {
      await apiClient.post('/promocodes/', payload);
      alert(`Promo code created successfully.`);
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert('Failed to create promo code.');
    }
  };

  return (
    <div>
      <h2>Create Promo Code</h2>
      <form onSubmit={handleNew}>
        <input type="text" placeholder="Promo Code" value={code} onChange={(e) => setCode(e.target.value)} required />
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Discount Type</option>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </select>
        <input type="number" placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} required />
        <input type="date" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
        <input type="number" placeholder="Usage Limit" value={usageLimit} onChange={(e) => setUsageLimit(e.target.value)} required />
        <input type="number" placeholder="Used count" value={usedCount} onChange={(e) => setUsedCount(e.target.value)} required />
        <input type="number" placeholder="Minimum Purchase" value={minimumPurchase} onChange={(e) => setMinimumPurchase(e.target.value)}  />
        <input type="number" placeholder="Maximum Discount" value={maxDiscount} onChange={(e) => setMaxDiscount(e.target.value)}  />
        <input type="text" placeholder="Applicable Products (comma-separated)" value={applicableProducts} onChange={(e) => setApplicableProducts(e.target.value)}  />
        <input type="text" placeholder="Allowed Users (comma-separated IDs)" value={allowedUsers} onChange={(e) => setAllowedUsers(e.target.value)} />
        
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default NewPromoCode;
