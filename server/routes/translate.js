const router = require('express').Router();
const Translate = require('../controllers/translate');

router.use('/', Translate.translate);

module.exports = router