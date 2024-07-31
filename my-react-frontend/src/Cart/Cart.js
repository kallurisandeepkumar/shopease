import React, { useState } from 'react';
import apiClient from '../utils/axiosConfig';

function Cart({ cart, setCart, handleCheckout }) {
  const [promoCode, setPromoCode] = useState('');

  const handleApplyPromoCode = async () => {
    try {
      const res = await apiClient.post('/promocodes/apply', {
        promoCode,
        cartId: cart._id // Ensure your cart items have a cartId or similar identifier
      });

      if (res.data) {
        console.log(res.data.cart)
        setCart(res.data.cart); // Update the cart state with the new cart from the server
        
        alert('Promo code applied!');
      } else {
        alert('Promo code application failed');
      }
    } catch (err) {
      console.error('Error applying promo code:', err);
      alert(`Failed to apply promo code: ${err.response?.data?.message || 'Unknown error'}.`);
    }
  };


  return (
    <div>
      {cart.items && cart.items.length > 0 ? (
        <>
          <h3>Cart</h3>
          <ul>
            {cart.items.map((item, index) => (
              <li key={index}>
                {item.name} - Original Price: ${item.price}, 
                Discount: ${item.discount}, 
                Quantity: {item.quantity},
                Discounted Price: ${item.discountedPrice}
              </li>
            ))}
          </ul>
          <div>Total: ${cart.total ? cart.total.toFixed(2) : '0.00'}</div> 
          <div>
            <input
              type="text"
              placeholder="Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={()=>handleApplyPromoCode()}>Apply Promo Code</button>
          </div>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
  
}

export default Cart;
