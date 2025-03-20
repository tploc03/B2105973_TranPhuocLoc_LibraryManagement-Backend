// controllers/docgiaController.js
const { body, validationResult } = require('express-validator');
const Docgia = require('../models/docgia');

exports.getAllDocgias = async (req, res, next) => {
  try {
    const docgias = await Docgia.find({ isDeleted: false });
    res.json(docgias);
  } catch (err) {
    next(err);
  }
};

exports.getDocgiaById = async (req, res, next) => {
  try {
    const docgia = await Docgia.findOne({ MADOCGIA: req.params.id });
    if (!docgia) return res.status(404).json({ message: 'Không tìm thấy độc giả' });
    res.json(docgia);
  } catch (err) {
    next(err);
  }
};

// Tạo độc giả mới
exports.createDocgia = [
  body('MADOCGIA').notEmpty().withMessage('Mã độc giả là bắt buộc'),
  body('HOLOT').notEmpty().withMessage('Họ lót là bắt buộc'),
  body('TEN').notEmpty().withMessage('Tên là bắt buộc'),
  body('NGAYSINH').isISO8601().withMessage('Ngày sinh phải là định dạng ISO (YYYY-MM-DD)'),
  body('PHAI').isIn(['Nam', 'Nữ']).withMessage('Phái phải là Nam hoặc Nữ'),
  body('DIACHI').notEmpty().withMessage('Địa chỉ là bắt buộc'),
  body('DIENTHOAI').isMobilePhone('vi-VN').withMessage('Số điện thoại không hợp lệ'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const docgia = new Docgia({
        MADOCGIA: req.body.MADOCGIA,
        HOLOT: req.body.HOLOT,
        TEN: req.body.TEN,
        NGAYSINH: req.body.NGAYSINH,
        PHAI: req.body.PHAI,
        DIACHI: req.body.DIACHI,
        DIENTHOAI: req.body.DIENTHOAI,
      });
      const newDocgia = await docgia.save();
      res.status(201).json(newDocgia);
    } catch (err) {
      next(err);
    }
  },
];

exports.updateDocgia = async (req, res, next) => {
  try {
    const updatedDocgia = await Docgia.findOneAndUpdate(
      { MADOCGIA: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedDocgia) return res.status(404).json({ message: 'Không tìm thấy độc giả' });
    res.json(updatedDocgia);
  } catch (err) {
    next(err);
  }
};

exports.deleteDocgia = async (req, res, next) => {
  try {
    const docgia = await Docgia.findOneAndUpdate(
      { MADOCGIA: req.params.id },
      { isDeleted: true },
      { new: true }
    );
    if (!docgia) return res.status(404).json({ message: 'Không tìm thấy độc giả' });
    res.json({ message: 'Đã đánh dấu xóa độc giả', docgia });
  } catch (err) {
    next(err);
  }
};