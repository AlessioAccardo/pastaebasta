const { body, param, validationResult } = require('express-validator');

const pietanzeValidator = [
  param('id').isInt().withMessage('ID non valido'),
  body('titolo').notEmpty().withMessage('Il titolo è obbligatorio'),
  body('descrizione').notEmpty().withMessage('La descrizione è obbligatoria'),
  body('prezzo').isFloat({ gt: 0 }).withMessage('Il prezzo deve essere un numero positivo')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    pietanzeValidator,
    validate
};