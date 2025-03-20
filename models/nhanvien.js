// models/nhanvien.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const nhanvienSchema = new mongoose.Schema({
  MSNV: { type: String, required: true, unique: true },
  HOTENNV: { type: String, required: true },
  PASSWORD: { type: String, required: true },
  CHUCVU: { type: String, required: true },
  DIACHI: { type: String, required: true },
  SODIENTHOAI: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

// Middleware mã hóa mật khẩu
nhanvienSchema.pre('save', async function (next) {
  if (this.isModified('PASSWORD')) {
    this.PASSWORD = await bcrypt.hash(this.PASSWORD, 10);
  }
  next();
});

module.exports = mongoose.model('Nhanvien', nhanvienSchema);