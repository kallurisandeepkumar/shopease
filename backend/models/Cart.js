const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    name:{
        type:String,
        ref:'Product',
        required:true
    },
    
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    price: { 
        type: Number, 
        required: true 
    },
    discount: { 
        type: Number, 
        default: 0 
    },
    discountedPrice: { // Add this field
        type: Number,
        required: true
    }
});

const CartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    items: [CartItemSchema],
    total: {
        type: Number,
        required: true,
        default: 0
    },
    appliedPromoCodes: {
        type: [String ],
       default :[]},
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
