// models/nhaxuatban.js
const mongoose = require('mongoose');

const nhaxuatbanSchema = new mongoose.Schema({
    MANXB: { type: String, required: true, unique: true },
    TENNXB: { type: String, required: true },
    DIACHI: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Nhaxuatban', nhaxuatbanSchema);