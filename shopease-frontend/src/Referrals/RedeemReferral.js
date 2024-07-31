import React, { useState } from 'react';
import axios from 'axios';

function RedeemReferral() {
  const [referralCode, setReferralCode] = useState('');
  const token = localStorage.getItem('token');

  const handleRedeem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/api/referrals/redeem',
        { referralCode },
        { headers: { 'x-auth-token': token } }
      );
      alert(`Referral redeemed! Promo Code: ${res.data.promoCode}`);
    } catch (err) {
      console.error(err);
      alert('Failed to redeem referral.');
    }
  };

  return (
    <div>
      <h2>Redeem Referral</h2>
      <form onSubmit={handleRedeem}>
        <input type="text" placeholder="Referral Code" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} required />
        <button type="submit">Redeem</button>
      </form>
    </div>
  );
}

export default RedeemReferral;
