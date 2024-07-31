import React, { useState } from 'react';
import apiClient from '../utils/axiosConfig';

function CreateReferral() {
  const [referredEmail, setEmail] = useState('');
  

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post(
        '/referrals/',
        {referredEmail } 
      );
      alert(`Referral created! share this with your friend : ${res.data.referralId}`);
    } catch (err) {
      console.error(err);
      alert('Failed to create referral.');
    }
  };

  return (
    <div>
      <h2>Create Referral</h2>
      <form onSubmit={handleCreate}>
        <input type="email" placeholder="referredEmail" value={referredEmail} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateReferral;
