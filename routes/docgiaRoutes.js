// routes/sachRoutes.js
const express = require('express');
const router = express.Router();
const sachController = require('../controllers/sachController');

router.get('/', sachController.getAllSachs);
router.get('/:id', sachController.getSachById);
router.post('/', sachController.createSach);
router.put('/:id', sachController.updateSach);
router.delete('/:id', sachController.deleteSach);

module.exports = router;