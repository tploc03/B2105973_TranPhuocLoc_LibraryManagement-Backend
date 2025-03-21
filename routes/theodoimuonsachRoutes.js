// routes/theodoimuonsachRoutes.js
const express = require('express');
const router = express.Router();
const theodoimuonsachController = require('../controllers/theodoimuonsachController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.verifyToken, theodoimuonsachController.getAllTheodoimuonsachs);
router.post('/', authMiddleware.verifyToken, theodoimuonsachController.createTheodoimuonsach);
router.put('/:id/approve', authMiddleware.verifyToken, authMiddleware.isAdmin, theodoimuonsachController.approveTheodoimuonsach);
router.put('/:id/reject', authMiddleware.verifyToken, authMiddleware.isAdmin, theodoimuonsachController.rejectTheodoimuonsach);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, theodoimuonsachController.updateTheodoimuonsach);

module.exports = router;