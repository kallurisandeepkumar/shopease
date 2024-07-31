const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();

// Import routes
const promoCodeRoutes = require('./routes/promocodes');
const referralRoutes = require('./routes/referrals');
const cartRoutes =require('./routes/carts')
const auth=require('./routes/auth')
const productRoutes = require('./routes/products');

const authMiddleware = require('./middleware/authMiddleware');
// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3001', // Your frontend's origin
    credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
  }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', auth);

// Define routes
console.log(typeof promoCodeRoutes)
console.log(typeof referralRoutes)
console.log(typeof auth)
app.use('/promocodes', authMiddleware, promoCodeRoutes);
app.use('/referrals',authMiddleware, referralRoutes);
app.use('/products',authMiddleware, productRoutes);
app.use('/cart',authMiddleware,cartRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
