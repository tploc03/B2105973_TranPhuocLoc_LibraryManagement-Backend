// models/taiKhoan.js
const mongoose = require('mongoose');

const taiKhoanSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('TaiKhoan', taiKhoanSchema);