const express = require('express');
const router = express.Router();
const { createPromoCode } = require('../controllers/promoCodeController');
const { getPromoCodes } = require('../controllers/promoCodeController');
const { applyPromoCode } = require('../controllers/promoCodeController');
const authMiddleware = require('../middleware/authMiddleware');
// Apply a promo code during checkout
router.post('/apply',  applyPromoCode);

// Get all available promo codes
router.get('/', getPromoCodes);

// Create a promo code
router.post('/', createPromoCode);

module.exports = router;
