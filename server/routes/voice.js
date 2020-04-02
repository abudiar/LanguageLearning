const router = require('express').Router();

router.use('/', require('../controllers/voice'))

module.exports = router