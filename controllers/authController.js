const { body, validationResult } = require('express-validator');
const TaiKhoan = require('../models/taikhoan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = [
  body('username').notEmpty().withMessage('Username là bắt buộc'),
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải dài ít nhất 6 ký tự'),
  // Thêm các trường thông tin cá nhân
  body('hoLot').notEmpty().withMessage('Họ lót là bắt buộc'),
  body('ten').notEmpty().withMessage('Tên là bắt buộc'),
  body('ngaySinh').notEmpty().withMessage('Hãy nhập ngày sinh'),
  body('phai').notEmpty().withMessage('Hãy nhập giới tính'),
  body('diaChi').notEmpty().withMessage('Địa chỉ là bắt buộc'),
  body('dienThoai').isMobilePhone('vi-VN').withMessage('Số điện thoại không hợp lệ'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, password, email, hoLot, ten, ngaySinh, phai, diaChi, dienThoai } = req.body;
      const existingUser = await TaiKhoan.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username hoặc Email đã tồn tại' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new TaiKhoan({
        username,
        password: hashedPassword,
        email,
        role: 'user', // Mặc định là user, admin sẽ thêm thủ công trong DB
        hoLot,
        ten,
        ngaySinh,
        phai,
        diaChi,
        dienThoai,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
      res.status(201).json({
        message: 'Tạo tài khoản thành công',
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
        token,
      });
    } catch (err) {
      next(err);
    }
  },
];

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await TaiKhoan.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Tài khoản không tồn tại' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mật khẩu không đúng' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({
      message: 'Đăng nhập thành công',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await TaiKhoan.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    res.json({ user });
  } catch (err) {
    next(err);
  }
};