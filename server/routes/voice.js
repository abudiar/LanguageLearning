const router = require('express').Router();
const VoiceController = require('../controllers/voice')

router.post('/', VoiceController.getVoice);

router.use('/', require('../controllers/voice'))

module.exports = router