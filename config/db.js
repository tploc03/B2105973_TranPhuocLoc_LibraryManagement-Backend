// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // Các option cũ nếu cần (với mongoose v6+ không cần useNewUrlParser, useUnifiedTopology)
    });
    console.log('Đã kết nối với MongoDB');
  } catch (err) {
    console.error('Không thể kết nối với MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
