const express = require('express');
const router = express.Router();
const { createReferral} = require('../controllers/referralController');
const { getReferralStatus} = require('../controllers/referralController');
const { redeemReferral } = require('../controllers/referralController');

// Create a referral
router.post('/', createReferral);

// Fetch referral status
router.get('/:id', getReferralStatus);

// Redeem a referral
router.post('/redeem', redeemReferral);

module.exports = router;
