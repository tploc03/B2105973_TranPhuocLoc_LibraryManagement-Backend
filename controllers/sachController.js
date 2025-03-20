// controllers/sachController.js
const { body, validationResult } = require('express-validator');
const Sach = require('../models/sach');
const Nhaxuatban = require('../models/nhaxuatban');

exports.getAllSachs = async (req, res, next) => {
  try {
    const sachs = await Sach.find({ isDeleted: false });
    res.json(sachs);
  } catch (err) {
    next(err);
  }
};

exports.getSachById = async (req, res, next) => {
  try {
    const sach = await Sach.findOne({ MASACH: req.params.id });
    if (!sach) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.json(sach);
  } catch (err) {
    next(err);
  }
};

exports.createSach = [
  body('MASACH').notEmpty().withMessage('Mã sách là bắt buộc'),
  body('TENSACH').notEmpty().withMessage('Tên sách là bắt buộc'),
  // body('DONGIA').isNumeric().withMessage('Đơn giá phải là số'),
  body('SOQUYEN').isInt({ min: 0 }).withMessage('Số quyển phải là số nguyên không âm'),
  body('NAMXUATBAN').isInt({ min: 1000, max: 2100 }).withMessage('Năm xuất bản không hợp lệ'),
  body('MANXB').notEmpty().withMessage('Mã NXB là bắt buộc'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const nhaxuatban = await Nhaxuatban.findOne({ MANXB: req.body.MANXB });
      if (!nhaxuatban) return res.status(400).json({ message: 'MANXB không hợp lệ' });
      const sach = new Sach({
        MASACH: req.body.MASACH,
        TENSACH: req.body.TENSACH,
        DONGIA: req.body.DONGIA,
        SOQUYEN: req.body.SOQUYEN,
        NAMXUATBAN: req.body.NAMXUATBAN,
        MANXB: req.body.MANXB,
        NGUONGOC_TACGIA: req.body.NGUONGOC_TACGIA,
      });
      const newSach = await sach.save();
      res.status(201).json(newSach);
    } catch (err) {
      next(err);
    }
  },
];

exports.updateSach = async (req, res, next) => {
  try {
    const updatedSach = await Sach.findOneAndUpdate(
      { MASACH: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedSach) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.json(updatedSach);
  } catch (err) {
    next(err);
  }
};

exports.deleteSach = async (req, res, next) => {
  try {
    const sach = await Sach.findOneAndUpdate(
      { MASACH: req.params.id },
      { isDeleted: true },
      { new: true }
    );
    if (!sach) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.json({ message: 'Đã đánh dấu xóa sách', sach });
  } catch (err) {
    next(err);
  }
};