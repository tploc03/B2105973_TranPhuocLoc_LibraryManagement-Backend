// models/theodoimuonsach.js
const mongoose = require('mongoose');

const theodoimuonsachSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'TaiKhoan', required: true },
  MASACH: { type: String, ref: 'Sach', required: true },
  NGAYMUON: { type: Date, required: true },
  NGAYTRA: { type: Date },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Theodoimuonsach', theodoimuonsachSchema);