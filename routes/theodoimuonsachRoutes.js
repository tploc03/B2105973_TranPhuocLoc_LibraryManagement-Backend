// routes/theodoimuonsachRoutes.js
const express = require('express');
const router = express.Router();
const theodoimuonsachController = require('../controllers/theodoimuonsachController');

router.get('/', theodoimuonsachController.getAllTheodoimuonsachs);
router.get('/:id', theodoimuonsachController.getTheodoimuonsachById);
router.post('/', theodoimuonsachController.createTheodoimuonsach);
router.put('/:id', theodoimuonsachController.updateTheodoimuonsach);
router.delete('/:id', theodoimuonsachController.deleteTheodoimuonsach);

module.exports = router;