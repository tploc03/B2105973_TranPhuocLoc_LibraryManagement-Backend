// controllers/theodoimuonsachController.js
const { body, validationResult } = require('express-validator');
const Theodoimuonsach = require('../models/theodoimuonsach');
const Docgia = require('../models/docgia');
const Sach = require('../models/sach');

exports.getAllTheodoimuonsachs = async (req, res, next) => {
  try {
    const records = await Theodoimuonsach.find({ isDeleted: false });
    res.json(records);
  } catch (err) {
    next(err);
  }
};

exports.getTheodoimuonsachById = async (req, res, next) => {
  try {
    // Ở đây dùng _id của MongoDB để định danh
    const record = await Theodoimuonsach.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Không tìm thấy thông tin mượn sách' });
    res.json(record);
  } catch (err) {
    next(err);
  }
};

exports.createTheodoimuonsach = [
  body('MADOCGIA').notEmpty().withMessage('Mã độc giả là bắt buộc'),
  body('MASACH').notEmpty().withMessage('Mã sách là bắt buộc'),
  body('NGAYMUON').isISO8601().withMessage('Ngày mượn phải là định dạng ISO (YYYY-MM-DD)'),
  body('NGAYTRA').optional().isISO8601().withMessage('Ngày trả phải là định dạng ISO (YYYY-MM-DD)'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const docgia = await Docgia.findOne({ MADOCGIA: req.body.MADOCGIA });
      const sach = await Sach.findOne({ MASACH: req.body.MASACH });
      if (!docgia || !sach) {
        return res.status(400).json({ message: 'MADOCGIA hoặc MASACH không hợp lệ' });
      }
      if (sach.SOQUYEN <= 0) {
        return res.status(400).json({ message: 'Sách đã hết, không thể mượn' });
      }
      const record = new Theodoimuonsach({
        MADOCGIA: req.body.MADOCGIA,
        MASACH: req.body.MASACH,
        NGAYMUON: req.body.NGAYMUON,
        NGAYTRA: req.body.NGAYTRA,
      });
      const newRecord = await record.save();
      await Sach.findOneAndUpdate(
        { MASACH: req.body.MASACH },
        { $inc: { SOQUYEN: -1 } }
      );
      res.status(201).json(newRecord);
    } catch (err) {
      next(err);
    }
  },
];

exports.updateTheodoimuonsach = async (req, res, next) => {
  try {
    const updatedRecord = await Theodoimuonsach.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecord) return res.status(404).json({ message: 'Không tìm thấy thông tin mượn sách' });
    // Nếu cập nhật NGAYTRA (trả sách), tăng SOQUYEN
    if (req.body.NGAYTRA && !updatedRecord.NGAYTRA) {
      await Sach.findOneAndUpdate(
        { MASACH: updatedRecord.MASACH },
        { $inc: { SOQUYEN: 1 } }
      );
    }
    res.json(updatedRecord);
  } catch (err) {
    next(err);
  }
};

exports.deleteTheodoimuonsach = async (req, res, next) => {
  try {
    const record = await Theodoimuonsach.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!record) return res.status(404).json({ message: 'Không tìm thấy thông tin mượn sách' });
    res.json({ message: 'Đã đánh dấu xóa thông tin mượn sách', record });
  } catch (err) {
    next(err);
  }
};