const { pietanzeValidator, validate } = require("../validators/pietanzeValidators");
const PietanzeCtrl = require("../controllers/pietanzeController");
const express = require("express");
const router = express.Router();


// GET all antipasti
router.get('/antipasti', PietanzeCtrl.getAllAntipasti);

// GET all primi
router.get('/primi', PietanzeCtrl.getAllPrimi);

// GET all secondi
router.get('/secondi', PietanzeCtrl.getAllSecondi);

// GET all dolci
router.get('/dolci', PietanzeCtrl.getAllDolci);

// GET all
router.get('/', PietanzeCtrl.getAll);

// POST create pietanza
router.post('/', PietanzeCtrl.create);

// PUT modify pietanza
router.put('/:id', pietanzeValidator, validate, PietanzeCtrl.modify);

// DELETE pietanza
router.delete('/:id', PietanzeCtrl.delete);