const Pietanze = require("../controllers/pietanzeController");

class PietanzeController {
    static async create(req, res, next) {
        try {
            const { titolo, descrizione, prezzo, path_immagine, categoria } = req.body;
            const pietanza = await Pietanze.create(titolo, descrizione, prezzo, path_immagine, categoria);
            res.status(201).json(pietanza);
        } catch (err) {
            next(err);
        }
    }

    static async getAll(req, res, next) {
        try {
            const pietanze = await Pietanze.getAll();
            res.status(200).json(pietanze);
        } catch (err) {
            next(err);
        }
    }

    static async getAllAntipasti(req, res, next) {
        try {
            const pietanze = await Pietanze.getAllAntipasti();
            res.status(200).json(pietanze);
        } catch (err) {
            next(err);
        }
    }

    static async getAllPrimi(req, res, next) {
        try {
            const pietanze = await Pietanze.getAllPrimi();
            res.status(200).json(pietanze);
        } catch (err) {
            next(err);
        }
    }

    static async getAllSecondi(req, res, next) {
        try {
            const pietanze = await Pietanze.getAllSecondi();
            res.status(200).json(pietanze);
        } catch (err) {
            next(err);
        }
    }

    static async getAllDolci(req, res, next) {
        try {
            const pietanze = await Pietanze.getAllDolci();
            res.status(200).json(pietanze);
        } catch (err) {
            next(err);
        }
    }

    static async modify(req, res, next) {
        try {
            const { titolo, descrizione, prezzo, path_immagine, categoria } = req.body;
            const { id } = req.params;
            await Pietanze.modify(id, titolo, descrizione, prezzo, path_immagine, categoria);
            res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            await Pietanze.delete(id);
            res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = PietanzeController;