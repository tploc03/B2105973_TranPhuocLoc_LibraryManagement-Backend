const mongoose = require('mongoose');

const theodoimuonsachSchema = new mongoose.Schema({
    MADOCGIA: { type: String, ref: 'Docgia', required: true },
    MASACH: { type: String, ref: 'Sach', required: true },
    NGAYMUON: { type: Date, required: true },
    NGAYTRA: { type: Date },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

// Đảm bảo MADOCGIA và MASACH là duy nhất khi kết hợp
theodoimuonsachSchema.index({ MADOCGIA: 1, MASACH: 1 }, { unique: true });

module.exports = mongoose.model('Theodoimuonsach', theodoimuonsachSchema);