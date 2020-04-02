
const router = require('express').Router();

class Voice {
    static send(req, res, next) {
        res.status(200).json({ data: 'RIFF����WAVEfmt ' })
    }
}

module.exports = Voice
