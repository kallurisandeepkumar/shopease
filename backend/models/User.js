const mongoose = require('mongoose');
const bcrypt =require('bcrypt')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  promoCodes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PromoCode'
    }
  ],
  referrals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Referral'
    }
  ]
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // Compare password
  UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

module.exports = mongoose.model('User', UserSchema);
