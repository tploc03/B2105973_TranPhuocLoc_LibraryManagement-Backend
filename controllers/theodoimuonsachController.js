// controllers/theodoimuonsachController.js
const { body, validationResult } = require('express-validator');
const Theodoimuonsach = require('../models/theodoimuonsach');
const Sach = require('../models/sach');
const TaiKhoan = require('../models/taikhoan');

exports.getAllTheodoimuonsachs = async (req, res, next) => {
  try {
    const records = await Theodoimuonsach.find({ isDeleted: false })
      .populate('userId', 'username hoLot ten')
      .populate('MASACH', 'TENSACH');
    if (req.user.role === 'user') {
      // Người dùng chỉ thấy lịch sử của mình
      res.json(records.filter(record => record.userId._id.toString() === req.user.id));
    } else {
      res.json(records);
    }
  } catch (err) {
    next(err);
  }
};

exports.createTheodoimuonsach = [
  body('MASACH').notEmpty().withMessage('Mã sách là bắt buộc'),
  body('NGAYMUON').isISO8601().withMessage('Ngày mượn phải là định dạng ISO (YYYY-MM-DD)'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const sach = await Sach.findOne({ MASACH: req.body.MASACH });
      if (!sach) return res.status(400).json({ message: 'Mã sách không hợp lệ' });
      if (sach.SOQUYEN <= 0) return res.status(400).json({ message: 'Sách đã hết' });

      const record = new Theodoimuonsach({
        userId: req.user.id, // Lấy từ token của người dùng
        MASACH: req.body.MASACH,
        NGAYMUON: req.body.NGAYMUON,
        status: 'pending', // Chờ duyệt
      });
      const newRecord = await record.save();
      res.status(201).json(newRecord);
    } catch (err) {
      next(err);
    }
  },
];

exports.approveTheodoimuonsach = async (req, res, next) => {
  try {
    const record = await Theodoimuonsach.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Không tìm thấy thông tin mượn sách' });
    if (record.status !== 'pending') return res.status(400).json({ message: 'Yêu cầu đã được xử lý' });

    record.status = 'approved';
    await record.save();
    await Sach.findOneAndUpdate({ MASACH: record.MASACH }, { $inc: { SOQUYEN: -1 } });
    res.json({ message: 'Đã duyệt mượn sách', record });
  } catch (err) {
    next(err);
  }
};

exports.rejectTheodoimuonsach = async (req, res, next) => {
  try {
    const record = await Theodoimuonsach.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Không tìm thấy thông tin mượn sách' });
    if (record.status !== 'pending') return res.status(400).json({ message: 'Yêu cầu đã được xử lý' });

    record.status = 'rejected';
    await record.save();
    res.json({ message: 'Đã từ chối mượn sách', record });
  } catch (err) {
    next(err);
  }
};

exports.updateTheodoimuonsach = async (req, res, next) => {
  try {
    const updatedRecord = await Theodoimuonsach.findByIdAndUpdate(
      req.params.id,
      { NGAYTRA: req.body.NGAYTRA },
      { new: true }
    );
    if (!updatedRecord) return res.status(404).json({ message: 'Không tìm thấy thông tin mượn sách' });
    if (req.body.NGAYTRA && !updatedRecord.NGAYTRA) {
      await Sach.findOneAndUpdate({ MASACH: updatedRecord.MASACH }, { $inc: { SOQUYEN: 1 } });
    }
    res.json(updatedRecord);
  } catch (err) {
    next(err);
  }
};