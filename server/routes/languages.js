const router = require('express').Router()

const syncDB = require('../middleware/syncDB')
const languagesControllers = require('../controllers/languages')

router.get('/languages', syncDB, languagesControllers.getLanguages)

module.exports = router
