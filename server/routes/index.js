const router = require('express').Router()
const routerVoice = require('./voice')
const routerUser = require('./user')

router.use('/user', routerUser)
router.use('/voices', routerVoice)

module.exports = router