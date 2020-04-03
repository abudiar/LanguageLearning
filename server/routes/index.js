const router = require('express').Router();
const routerVoice = require('./voice');
const routerUser = require('./user');
const translate = require('./translate');
const routerClass = require('./class');

router.use('/user', routerUser);
router.use('/voices', routerVoice);
router.use('/translate', translate);
router.use('/classes', routerClass);

module.exports = router;