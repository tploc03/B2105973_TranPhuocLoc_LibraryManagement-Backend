// routes/docgiaRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const TaiKhoan = require('../models/taikhoan');

// Lấy danh sách người dùng (thay cho độc giả)
router.get('/', authMiddleware.verifyToken, authMiddleware.isAdmin, async (req, res, next) => {
  try {
    const users = await TaiKhoan.find({ role: 'user' }).select('-password');
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;