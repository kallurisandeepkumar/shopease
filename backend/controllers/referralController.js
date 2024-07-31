const Referral = require('../models/Referral');
const PromoCode = require('../models/PromoCode');
const User = require('../models/User');

// @desc    Create a referral
// @route   POST /api/referrals
// @access  Public
exports.createReferral = async (req, res) => {
  const {  referredEmail } = req.body;

  try {
    const referrerId = req.user;
    const newReferral = new Referral({
      referrerId,
      referredEmail
    });

    await newReferral.save();
    console.log(newReferral._id)
    res.status(201).json({ "message": 'Referral created', "referralId": newReferral._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Fetch referral status
// @route   GET /api/referrals/:id
// @access  Public
exports.getReferralStatus = async (req, res) => {
  try {
    
    const referral = await Referral.findById(req.body.referralId);

    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }

    res.json(referral);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Redeem a referral
// @route   POST /api/referrals/redeem
// @access  Public
exports.redeemReferral = async (req, res) => {
  //console.log(req.body)
  const  referralId  = req.body.referralCode;
  console.log(referralId)
  const  userId = req.user;
  
  try {
    const referral = await Referral.findById(referralId);
    //console.log(referral)

    if (!referral || referral.status !== 'pending') {
      return res.status(400).json({ message: 'Invalid or already redeemed referral' });
    }

    if(referral.referrerId==referral.user){
      return res.status(400).json({mesasge:"you cannot redeem your own referral yaar"})
    }

    // Mark the referral as completed
    referral.status = 'completed';
    await referral.save();

    // Generate a promo code for the referred user
    const promoCode = new PromoCode({
      code: `WELCOME-${userId}`,
      type: 'fixed',
      value: 10,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      usageLimit: 1,
      applicableProducts: []
    });

    await promoCode.save();
    // Add promo code to the referred user's account
    console.log(userId)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.promoCodes.push(promoCode._id);
    await user.save();

    res.json({ message: 'Referral redeemed', promoCode: promoCode.code });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Server Error ,promode already created for${user}`);
  }
};
