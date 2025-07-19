const db = require('../../db/database');
const bcrypt = require('bcryptjs');

class User {
    static async create({ first_name, last_name, email, password }) {
        
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`,
                [first_name, last_name, email, hashedPassword],
                function(err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, first_name, last_name, email });
                }
            );
        });
    }


    static async comparePassword(candidatePassword, hash) {
        return bcrypt.compare(candidatePassword, hash);
    }

    
static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users where email = ?', [email], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', [id],
                function(err) {
                    if (err) return reject(err);
                    resolve(row);
                }
            );
        });
    }
}


module.exports = User;