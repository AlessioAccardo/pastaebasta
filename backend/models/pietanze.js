const db = require('../db/database');

class Pietanze {

    static async create(titolo, descrizione, prezzo, path_immagine, categoria) {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO pietanze (titolo, descrizione, prezzo, path_immagine, categoria) VALUES (?,?,?,?,?)`,
                [titolo, descrizione, prezzo, path_immagine, categoria],
                function(err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, titolo, descrizione, prezzo, path_immagine, categoria });
                }
            );
        });
    }

    static async getAll() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM pietanze`, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getAllAntipasti() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM pietanze WHERE categoria = ?`, [antipasti], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getAllPrimi() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM pietanze WHERE categoria = ?`, [primi], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getAllSecondi() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM pietanze WHERE categoria = ?`, [secondi], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getAllDolci() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM pietanze WHERE categoria = ?`, [dolci], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async modify(id, titolo, descrizione, prezzo, path_immagine, categoria) {
        return new Promise((resolve, reject) => {
            db.run(`
                UPDATE pietanze 
                SET titolo        = ?,
                    descrizione   = ?,
                    prezzo        = ?,
                    path_immagine = ?,
                    categoria     = ?,
                WHERE id          = ?`,
                [titolo, descrizione, prezzo, path_immagine, categoria, id],
                function(err) {
                    if (err) return reject(err);
                    resolve({ id });
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE * FROM pietanze WHERE id = ?`,
                [id],
                function(err) {
                    if (err) return reject(err),
                    resolve({ id });
                }
            );
        });
    }

}


module.exports = Pietanze;