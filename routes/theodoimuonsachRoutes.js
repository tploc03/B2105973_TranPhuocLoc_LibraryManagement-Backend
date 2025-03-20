// routes/theodoimuonsachRoutes.js
const express = require('express');
const router = express.Router();
const theodoimuonsachController = require('../controllers/theodoimuonsachController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', theodoimuonsachController.getAllTheodoimuonsachs);
router.get('/:id', theodoimuonsachController.getTheodoimuonsachById);
router.post('/', authMiddleware.verifyToken, theodoimuonsachController.createTheodoimuonsach);
router.put('/:id', authMiddleware.verifyToken, theodoimuonsachController.updateTheodoimuonsach);
router.delete('/:id', authMiddleware.verifyToken, theodoimuonsachController.deleteTheodoimuonsach);

module.exports = router;