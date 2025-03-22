// models\taikhoan.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taiKhoanSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Thêm role
  // Thêm thông tin cá nhân thay thế Docgia
  hoLot: { type: String },
  ten: { type: String },
  ngaySinh: { type: Date },
  phai: { type: String, enum: ['Nam', 'Nữ'] },
  diaChi: { type: String },
  dienThoai: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('TaiKhoan', taiKhoanSchema);