import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Auth/Register';
import Login from './Auth/Login';

import NewPromoCode from './PromoCodes/NewPromoCode';
import CreateReferral from './Referrals/CreateReferral';
import RedeemReferral from './Referrals/RedeemReferral';
//import PrivateRoute from './utils/PrivateRoute';
import ProductCatalog from './Products/ProductCatalog';
import AddProduct from './Products/addProduct' 

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          
      <Route path="/products" element={ <ProductCatalog />}/>
      <Route path="/add-products" element={ <AddProduct />}/>
      <Route path="/add-new-promo" element={ <NewPromoCode />}/>

      <Route path="/create-referral" element={ <CreateReferral />}/>
      <Route path="/redeem-referral" element={ <RedeemReferral />}/>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
