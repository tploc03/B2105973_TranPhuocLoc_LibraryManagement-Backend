const mongoose = require('mongoose');

const sachSchema = new mongoose.Schema({
    MASACH: { type: String, required: true, unique: true },
    TENSACH: { type: String, required: true },
    DONGIA: { type: Number, required: true },
    SOQUYEN: { type: Number, required: true },
    NAMXUATBAN: { type: Number, required: true },
    MANXB: { type: String, ref: 'Nhaxuatban', required: true },
    NGUONGOC_TACGIA: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Sach', sachSchema);