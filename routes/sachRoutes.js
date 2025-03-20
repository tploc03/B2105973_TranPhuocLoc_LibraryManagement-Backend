// routes/sachRoutes.js
const express = require('express');
const router = express.Router();
const sachController = require('../controllers/sachController');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');

router.get('/', sachController.getAllSachs);
router.get('/:id', sachController.getSachById);
router.post('/', verifyToken, verifyRole('ADMIN'), sachController.createSach);
router.put('/:id', verifyToken, verifyRole('ADMIN'), sachController.updateSach);
router.delete('/:id', verifyToken, verifyRole('ADMIN'), sachController.deleteSach);

module.exports = router;