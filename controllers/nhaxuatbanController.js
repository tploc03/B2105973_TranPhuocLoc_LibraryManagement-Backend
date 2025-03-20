// controllers/nhaxuatbanController.js
const { body, validationResult } = require('express-validator');
const Nhaxuatban = require('../models/nhaxuatban');

exports.getAllNhaxuatbans = async (req, res, next) => {
  try {
    const nhaxuatbans = await Nhaxuatban.find({ isDeleted: false });
    res.json(nhaxuatbans);
  } catch (err) {
    next(err);
  }
};

exports.getNhaxuatbanById = async (req, res, next) => {
  try {
    const nhaxuatban = await Nhaxuatban.findOne({ MANXB: req.params.id });
    if (!nhaxuatban) return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản' });
    res.json(nhaxuatban);
  } catch (err) {
    next(err);
  }
};

exports.createNhaxuatban = [
  body('MANXB').notEmpty().withMessage('Mã nhà xuất bản là bắt buộc'),
  body('TENNXB').notEmpty().withMessage('Tên nhà xuất bản là bắt buộc'),
  body('DIACHI').notEmpty().withMessage('Địa chỉ là bắt buộc'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const nhaxuatban = new Nhaxuatban({
        MANXB: req.body.MANXB,
        TENNXB: req.body.TENNXB,
        DIACHI: req.body.DIACHI,
      });
      const newNhaxuatban = await nhaxuatban.save();
      res.status(201).json(newNhaxuatban);
    } catch (err) {
      next(err);
    }
  },
];

exports.updateNhaxuatban = async (req, res, next) => {
  try {
    const updatedNhaxuatban = await Nhaxuatban.findOneAndUpdate(
      { MANXB: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedNhaxuatban) return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản' });
    res.json(updatedNhaxuatban);
  } catch (err) {
    next(err);
  }
};

exports.deleteNhaxuatban = async (req, res, next) => {
  try {
    const nhaxuatban = await Nhaxuatban.findOneAndUpdate(
      { MANXB: req.params.id },
      { isDeleted: true },
      { new: true }
    );
    if (!nhaxuatban) return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản' });
    res.json({ message: 'Đã đánh dấu xóa nhà xuất bản', nhaxuatban });
  } catch (err) {
    next(err);
  }
};