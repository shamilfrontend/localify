const router = require('express').Router()

const usersControllers = require('../controllers/users')
const syncDB = require('../middleware/syncDB')

router.post('/', syncDB, usersControllers.signIn)
router.get('/demo', syncDB, usersControllers.getDemoUser)
router.get('/self', syncDB, usersControllers.getCurrentUser)
router.post('/reset_password', syncDB, usersControllers.resetPassword)
router.post('/update_password', syncDB, usersControllers.updatePassword)
router.post('/change_password', syncDB, usersControllers.changePassword)
router.get('/check/:reset_token', syncDB, usersControllers.checkResetToken)
router.get('/:email', syncDB, usersControllers.getUsers)
router.post('/logout', syncDB, usersControllers.clearToken)

module.exports = router
