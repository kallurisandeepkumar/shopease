import React, { useState } from 'react';
import axios from 'axios';

function ApplyPromoCode() {
  const [code, setCode] = useState('');
  const token = localStorage.getItem('token');

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/api/promocodes/apply',
        { code },
        { headers: { 'x-auth-token': token } }
      );
      alert(`Promo code applied! Discount: ${res.data.discount}`);
    } catch (err) {
      console.error(err);
      alert('Failed to apply promo code.');
    }
  };

  return (
    <div>
      <h2>Apply Promo Code</h2>
      <form onSubmit={handleApply}>
        <input type="text" placeholder="Promo Code" value={code} onChange={(e) => setCode(e.target.value)} required />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default ApplyPromoCode;
