const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// La blacklist è persistente in questo modo
// Il file blacklist.json non deve essere creato manualmente: 
// sarà creato automaticamente alla prima invalidazione di token nella cartella 'services'
const blacklistPath = path.join(__dirname, '../blacklist.json');
let tokenBlacklist = new Set();

if (fs.existsSync(blacklistPath)) {
  const tokens = JSON.parse(fs.readFileSync(blacklistPath, 'utf-8'));
  tokenBlacklist = new Set(tokens);
}

function saveBlacklist() {
  fs.writeFileSync(blacklistPath, JSON.stringify([...tokenBlacklist]), 'utf-8');
}

class AuthService {

    static async registerUser(userData) {
        try {
            const existingUser = await User.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email già in uso');
            }
            
            const user = await User.create(userData);
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            return { user, token };
        } catch (error) {
            throw error;
        }
    }

    static async loginUser(email, password) {
        try {
            const userRecord = await User.findByEmail(email);
            if (!userRecord) {
                throw new Error('Credenziali non valide');
            }

            // check se la password é corretta
            const isMatch = await User.comparePassword(password, userRecord.password);
            if (!isMatch) {
                throw new Error('Credenziali non valide');
            }

            // esclusione della password dalla risposta
            const { password: _, ...user } = userRecord;

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            return { user, token };
        } catch (error) {
            throw error;
        }
    }

    static async verifyUser(id) {
        try {
            const user = await User.verifyUser(id);
            if (!user) {
                throw new Error('User inesistente');
            }
        } catch (error) {
            throw error;
        }
    }

    static logoutUser(token) {
        tokenBlacklist.add(token);
        saveBlacklist();
    }

    static isTokenBlackListed(token) {
        return tokenBlacklist.has(token);
    }
}

module.exports = AuthService;