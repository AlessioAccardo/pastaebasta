const AuthService = require('../services/authService');
const jwt = require('jsonwebtoken');

class AuthController {

    static async register(req, res) {
        try {
            const { user, token } = await AuthService.registerUser(req.body);
            res.status(201).json({
                success: true,
                data: user,
                token
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await AuthService.loginUser(email, password);
            res.json({
                success: true,
                data: user,
                token
            });
        } catch (err) {
            res.status(401).json({
                success: false,
                message: err.message
            });
        }
    }

    static async verify(req, res) {
        try {
            const authHeader = req.headers['authorization'] || '';
            const token = authHeader.startsWith('Bearer') ? authHeader.slice(7) : null;
            if (!token || AuthService.isTokenBlackListed(token)) {
                return res.status(401).json({ success: false, message: 'Token non valido'});
            }
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const user = await AuthService.verifyUser(payload.id);
            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    static logout(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (token) {
                AuthService.logoutUser(token);
            }
            res.sendStatus(204);
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
    
}

module.exports = AuthController;