const express = require('express');
const router = express.Router()
const AuthController = require('../controllers/authController');
const { registerValidator, loginValidator, validate } = require('../validators/authValidator');

// Registrazione
router.post('/register', registerValidator, validate, AuthController.register);

// Login
router.post('/login', loginValidator, validate, AuthController.login);

// Verifica autenticazione
router.post('/verify', AuthController.verify);

// Logout
router.post('/logout', AuthController.logout)


module.exports = router;