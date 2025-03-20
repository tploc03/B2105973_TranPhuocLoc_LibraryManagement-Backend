// models/docgia.js
const mongoose = require('mongoose');

const docgiaSchema = new mongoose.Schema({
    MADOCGIA: { type: String, required: true, unique: true },
    HOLOT: { type: String, required: true },
    TEN: { type: String, required: true },
    NGAYSINH: { type: Date, required: true },
    PHAI: { type: String, required: true },
    DIACHI: { type: String, required: true },
    DIENTHOAI: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Docgia', docgiaSchema);