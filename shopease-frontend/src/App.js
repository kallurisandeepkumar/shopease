import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ApplyPromoCode from './components/PromoCodes/ApplyPromoCode';
import CreateReferral from './components/Referrals/CreateReferral';
import RedeemReferral from './components/Referrals/RedeemReferral';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/apply-promocode" component={ApplyPromoCode} />
          <PrivateRoute path="/create-referral" component={CreateReferral} />
          <PrivateRoute path="/redeem-referral" component={RedeemReferral} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
