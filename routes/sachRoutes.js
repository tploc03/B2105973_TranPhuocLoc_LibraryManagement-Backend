// routes/sachRoutes.js
const express = require('express');
const router = express.Router();
const sachController = require('../controllers/sachController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', sachController.getAllSachs);
router.get('/:id', sachController.getSachById);
router.post('/', authMiddleware.verifyToken, sachController.createSach);
router.put('/:id', authMiddleware.verifyToken, sachController.updateSach);
router.delete('/:id', authMiddleware.verifyToken, sachController.deleteSach);

module.exports = router;