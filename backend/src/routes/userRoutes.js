const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

// Crear usuario (POST /api/users)
router.post('/', verifyToken, userController.createUser);

// Obtener usuario por uid (GET /api/users/:uid)
router.get('/:uid', verifyToken, userController.getUserByUid);

// Actualizar usuario por uid (PUT /api/users/:uid)
router.put('/:uid', verifyToken, userController.updateUser);

module.exports = router;
