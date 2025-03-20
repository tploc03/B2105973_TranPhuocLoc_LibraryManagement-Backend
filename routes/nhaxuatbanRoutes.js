// routes/nhaxuatbanRoutes.js
const express = require('express');
const router = express.Router();
const nhaxuatbanController = require('../controllers/nhaxuatbanController');

router.get('/', nhaxuatbanController.getAllNhaxuatbans);
router.get('/:id', nhaxuatbanController.getNhaxuatbanById);
router.post('/', nhaxuatbanController.createNhaxuatban);
router.put('/:id', nhaxuatbanController.updateNhaxuatban);
router.delete('/:id', nhaxuatbanController.deleteNhaxuatban);

module.exports = router;