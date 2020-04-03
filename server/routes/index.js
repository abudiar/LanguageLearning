const router = require('express').Router()
const routerVoice = require('./voice')
const routerUser = require('./user')
const translate = require('./translate')

router.use('/user', routerUser)
router.use('/voices', routerVoice)
router.use('/translate', translate)

module.exports = router