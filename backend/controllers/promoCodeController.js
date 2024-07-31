const PromoCode = require('../models/PromoCode');
const Cart = require('../models/Cart');
const user =require('../models/User')
// @desc    Create a promo code
// @route   POST /api/promocodes
// @access  Public (you might want to change this to admin-only in a real app)
exports.createPromoCode = async (req, res) => {
  const { code, type, value, expiryDate, usageLimit, applicableProducts,minimumPurchase,maxDiscount,
    allowedUsers } = req.body;

  try {
    const newPromoCode = new PromoCode({
      code,
      type,
      value,
      expiryDate,
      usageLimit,
      applicableProducts,
      minimumPurchase,
      maxDiscount,
      allowedUsers
    });

    await newPromoCode.save();

    res.status(201).json({ message: 'Promo code created successfully', promoCode: newPromoCode });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// @desc    Get all available promo codes
// @route   GET /api/promocodes
// @access  Public
exports.getPromoCodes = async (req, res) => {
  try {
    const promoCodes = await PromoCode.find();
    res.json(promoCodes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
function calculateDiscounts(cart, codeDetails) {
  let totalDiscount = 0;
  let applicableItems =[];
  if(codeDetails.applicableProducts.length == 0 ){
    applicableItems = cart.items;
  }
  else{
  applicableItems = cart.items.filter(item => codeDetails.applicableProducts.includes(item.name.toString()));
  }
  console.log("logging applicable items",applicableItems)

  // First pass: calculate potential discounts
  applicableItems.forEach(item => {
      let potentialDiscount = 0;
      if (codeDetails.type === 'percentage') {
          potentialDiscount = item.price * (codeDetails.value / 100);
      } else if (codeDetails.type === 'fixed') {
          potentialDiscount = Math.min(codeDetails.value, item.price);  // Fixed discount cannot exceed item price
      }
      totalDiscount += potentialDiscount * item.quantity;
  });

  // Second pass: apply discounts, respecting the maximum discount if defined
  if (codeDetails.maxDiscount && totalDiscount > codeDetails.maxDiscount) {
      let discountFactor = codeDetails.maxDiscount / totalDiscount;
      applicableItems.forEach(item => {
          let itemDiscount = (item.price * (codeDetails.value / 100)) * discountFactor;
          item.discount = itemDiscount;
          item.discountedPrice = (item.price - itemDiscount) * item.quantity;
      });
  } else {
      applicableItems.forEach(item => {
          let itemDiscount = codeDetails.type === 'percentage' ? item.price * (codeDetails.value / 100) : Math.min(codeDetails.value, item.price);
          item.discount = itemDiscount;
          item.discountedPrice = (item.price - itemDiscount) * item.quantity;
      });
  }

    // Return updated items for further processing if needed
}
// @desc    Apply a promo code during checkout
// @route   POST /api/promocodes/apply
// @access  Public
exports.applyPromoCode = async (req, res) => {
  const { promoCode, cartId } = req.body;
  

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const codeDetails = await PromoCode.findOne({ code: promoCode });
    if (!codeDetails) {
      return res.status(404).json({ message: 'Promo code not found' });
    }

     // Check if the promo code has already been applied
     if (cart.appliedPromoCodes.includes(promoCode)) {
      return res.status(400).json({ message: 'Promo code has already been applied' });
  }

    if (codeDetails.expiryDate < new Date()) {
      return res.status(400).json({ message: 'Promo code has expired' });
    }
    // Checking if the user is allowed to use this promo code
    const userId=req.user;
    const username =user.findById(userId);
   
    
    if (codeDetails.allowedUsers.length > 0 && !codeDetails.allowedUsers.includes(username)) {
      return res.status(403).json({ message: 'You are not allowed to use this promo code' });
  }

  let userUsage = codeDetails.userUsages.find(usage => usage.user.toString() === userId);
  if (userUsage && userUsage.count >= codeDetails.perUserLimit) {
      return res.status(400).json({ message: 'Promo code usage limit reached for this user' });
  }

  if (!userUsage) {
      userUsage = { user: userId, count: 0 };
      codeDetails.userUsages.push(userUsage);
  }
  userUsage.count++;

    if (codeDetails.usedCount >= codeDetails.usageLimit) {
      return res.status(400).json({ message: 'Promo code usage limit reached' });
    }
    
    calculateDiscounts(cart, codeDetails);
    

    // Recalculate cart total
    cart.total = cart.items.reduce((acc, curr) => acc + curr.discountedPrice, 0);
    cart.appliedPromoCodes.push(promoCode);
    // Increase the used count
    codeDetails.usedCount += 1;
    await codeDetails.save();

    await cart.save();
    console.log(cart)
    res.json({ message: 'Promo code applied successfully', cart });
  } catch (err) {
    console.error('Error applying promo code:', err);
    res.status(500).send('Server Error');
  }
};


