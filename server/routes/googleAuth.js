const router = require('express').Router()
const passport = require('passport')

const syncDB = require('../middleware/syncDB')
const usersControllers = require('../controllers/users')

router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)
router.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: '/signin'
  }),
  syncDB,
  usersControllers.googleAuth
)

module.exports = router
