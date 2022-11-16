const router = require('express').Router()

// keys
const syncDB = require('../middleware/syncDB')
const keysControllers = require('../controllers/keys')

router.post('/projects/:projectId/keys', syncDB, keysControllers.createKeys)
router.put(
  '/projects/:projectId/keys/:keyId',
  syncDB,
  keysControllers.updateKey
)
router.post(
  '/projects/:projectId/keys/remove',
  syncDB,
  keysControllers.removeKeys
)

module.exports = router
