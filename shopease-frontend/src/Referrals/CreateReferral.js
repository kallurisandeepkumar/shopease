import React, { useState } from 'react';
import axios from 'axios';

function CreateReferral() {
  const [email, setEmail] = useState('');
  const token = localStorage.getItem('token');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/api/referrals/create',
        { email },
        { headers: { 'x-auth-token': token } }
      );
      alert(`Referral created! Code: ${res.data.referralCode}`);
    } catch (err) {
      console.error(err);
      alert('Failed to create referral.');
    }
  };

  return (
    <div>
      <h2>Create Referral</h2>
      <form onSubmit={handleCreate}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateReferral;
