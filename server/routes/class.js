const router = require('express').Router()
const ClassController = require('../controllers/class')
const middlewares = require('../middlewares')

router.use(middlewares.authenticate);

router.get('/', ClassController.getAll)
router.post('/', ClassController.create)
router.get('/:id', ClassController.getOne)
router.delete('/:id', ClassController.deleteClass)

module.exports = router