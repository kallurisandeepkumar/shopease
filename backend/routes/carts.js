const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// POST endpoint to create a new cart or add items to it
router.post('/', async (req, res) => {
    const {  productId,name, quantity, price } = req.body;
    const userId=req.user
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // Create a new cart if not exists
            console.log("created a new cart")
            cart = new Cart({
                userId,
                items: [{ productId ,name, quantity, price, discountedPrice: price }],
                total: price * quantity
            });
        } else {
            // Add new item or update existing one in the cart
            console.log("cart updated")
            const itemIndex = cart.items.findIndex(item => item.name == name);
            console.log(itemIndex)
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
                cart.items[itemIndex].discountedPrice = (cart.items[itemIndex].price - cart.items[itemIndex].discount) * cart.items[itemIndex].quantity;
            } else {
                console.log({ productId,name, quantity, price, discountedPrice: price })
                cart.items.push({ productId,name, quantity, price, discountedPrice: price });
            }
            cart.total = cart.items.reduce((acc, curr) => acc + curr.discountedPrice * curr.quantity, 0);
        }
        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error managing cart');
    }
});


// GET endpoint to retrieve a user's cart
router.get('/', async (req, res) => {
    const userId = req.user; // Ensure 'req.user' is populated by your authentication middleware

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
