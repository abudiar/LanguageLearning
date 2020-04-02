const router = require('express').Router();
const VoiceController = require('../controllers/voice')

router.post('/', VoiceController.getVoice);

module.exports = router