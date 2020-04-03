const router = require('express').Router();
const VoiceController = require('../controllers/voice')

router.get('/', VoiceController.getVoice);

router.use('/', require('../controllers/voice'))

module.exports = router