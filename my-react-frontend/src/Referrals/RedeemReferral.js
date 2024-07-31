import React, { useState } from 'react';
import apiClient from '../utils/axiosConfig';

function RedeemReferral() {
  const [referralCode, setReferralCode] = useState('');
  

  const handleRedeem = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post(
        '/referrals/redeem',
        { referralCode }
      );
      alert(`Referral redeemed! Promo Code: ${res.data.promoCode}`);
    } catch (err) {
      console.error(err);
      alert(`Failed to redeem referral.${err.response.data.message||err.response.data}`);
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
