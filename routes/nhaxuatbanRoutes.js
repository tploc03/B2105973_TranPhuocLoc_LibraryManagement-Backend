// routes/nhaxuatbanRoutes.js
const express = require('express');
const router = express.Router();
const nhaxuatbanController = require('../controllers/nhaxuatbanController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', nhaxuatbanController.getAllNhaxuatbans);
router.get('/:id', nhaxuatbanController.getNhaxuatbanById);
router.post('/', authMiddleware.verifyToken, nhaxuatbanController.createNhaxuatban);
router.put('/:id', authMiddleware.verifyToken, nhaxuatbanController.updateNhaxuatban);
router.delete('/:id', authMiddleware.verifyToken, nhaxuatbanController.deleteNhaxuatban);

module.exports = router;