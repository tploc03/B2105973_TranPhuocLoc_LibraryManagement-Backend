// routes/docgiaRoutes.js
const express = require('express');
const router = express.Router();
const docgiaController = require('../controllers/docgiaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', docgiaController.getAllDocgias);
router.get('/:id', docgiaController.getDocgiaById);
router.post('/', authMiddleware.verifyToken, docgiaController.createDocgia);
router.put('/:id', authMiddleware.verifyToken, docgiaController.updateDocgia);
router.delete('/:id', authMiddleware.verifyToken, docgiaController.deleteDocgia);

module.exports = router;