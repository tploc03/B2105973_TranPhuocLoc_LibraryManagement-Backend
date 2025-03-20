// routes/nhanvienRoutes.js
const express = require('express');
const router = express.Router();
const nhanvienController = require('../controllers/nhanvienController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', nhanvienController.getAllNhanviens);
router.get('/:id', nhanvienController.getNhanvienById);
router.post('/', authMiddleware.verifyToken, nhanvienController.createNhanvien);
router.put('/:id', authMiddleware.verifyToken, nhanvienController.updateNhanvien);
router.delete('/:id', authMiddleware.verifyToken, nhanvienController.deleteNhanvien);

module.exports = router;