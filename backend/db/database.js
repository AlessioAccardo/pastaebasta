const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbFile = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.log('Errore nella connessione al database');
    } else {
        db.serialize(() => {
            db.run('PRAGMA foreign_keys = ON;', (err) => {
                if (err) {
                    console.log(`Errore nell'attivazione delle foreign keys:`, err);
                } else {
                    console.log('Foreign key support attivato!');
                }
            });

            db.run(`CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    first_name VARCHAR(45) NOT NULL,
                    last_name VARCHAR(45) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS pietanze (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    titolo VARCHAR(255) NOT NULL,
                    descrizione TEXT NOT NULL,
                    prezzo DECIMAL (6,2) NOT NULL,
                    path_immagine TEXT,
                    categoria TEXT NOT NULL
            )`);
        });
    }
});

module.exports = db;