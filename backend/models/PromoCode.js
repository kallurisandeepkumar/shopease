const mongoose = require('mongoose');
const PromoCodeUsageSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  count: {
      type: Number,
      default: 1,
      required: true
  }
});
const PromoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  perUserLimit: {  // Maximum usage per individual user
    type: Number,
    required: true,
    default: 1
  },
  type: {
    type: String,
    required: true,
    enum: ['percentage', 'fixed']
  },
  value: {
    type: Number,
    required: true
  },
  maxDiscount: {
    type: Number
  },
  minimumPurchase: {
    type: Number
  },
  allowedUsers: {
    type: [String], // Array of user IDs
    
    default: []
  },
  expiryDate: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    required: true
  },
  usedCount: {
    type: Number,
    default: 0
  },
  applicableProducts: {
    type: [String],
    
    default: []
  },
  userUsages: [PromoCodeUsageSchema]
});

module.exports = mongoose.model('PromoCode', PromoCodeSchema);
