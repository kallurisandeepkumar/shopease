require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURL = process.env.DATABASE_URL;
    await mongoose.connect(dbURL);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
