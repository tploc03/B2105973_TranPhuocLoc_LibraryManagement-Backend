// controllers/nhanvienController.js
const { body, validationResult } = require('express-validator');
const Nhanvien = require('../models/nhanvien');

exports.getAllNhanviens = async (req, res, next) => {
  try {
    const nhanviens = await Nhanvien.find({ isDeleted: false });
    res.json(nhanviens);
  } catch (err) {
    next(err);
  }
};

exports.getNhanvienById = async (req, res, next) => {
  try {
    const nhanvien = await Nhanvien.findOne({ MSNV: req.params.id });
    if (!nhanvien) return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    res.json(nhanvien);
  } catch (err) {
    next(err);
  }
};

exports.createNhanvien = [
  body('MSNV').notEmpty().withMessage('Mã nhân viên là bắt buộc'),
  body('HOTENNV').notEmpty().withMessage('Họ tên là bắt buộc'),
  body('PASSWORD').isLength({ min: 6 }).withMessage('Mật khẩu phải dài ít nhất 6 ký tự'),
  body('CHUCVU').notEmpty().withMessage('Chức vụ là bắt buộc'),
  body('DIACHI').notEmpty().withMessage('Địa chỉ là bắt buộc'),
  body('SODIENTHOAI').isMobilePhone('vi-VN').withMessage('Số điện thoại không hợp lệ'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const nhanvien = new Nhanvien({
        MSNV: req.body.MSNV,
        HOTENNV: req.body.HOTENNV,
        PASSWORD: req.body.PASSWORD,
        CHUCVU: req.body.CHUCVU,
        DIACHI: req.body.DIACHI,
        SODIENTHOAI: req.body.SODIENTHOAI,
      });
      const newNhanvien = await nhanvien.save();
      res.status(201).json(newNhanvien);
    } catch (err) {
      next(err);
    }
  },
];

exports.updateNhanvien = async (req, res, next) => {
  try {
    const updatedNhanvien = await Nhanvien.findOneAndUpdate(
      { MSNV: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedNhanvien) return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    res.json(updatedNhanvien);
  } catch (err) {
    next(err);
  }
};

exports.deleteNhanvien = async (req, res, next) => {
  try {
    const nhanvien = await Nhanvien.findOneAndUpdate(
      { MSNV: req.params.id },
      { isDeleted: true },
      { new: true }
    );
    if (!nhanvien) return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    res.json({ message: 'Đã đánh dấu xóa nhân viên', nhanvien });
  } catch (err) {
    next(err);
  }
};