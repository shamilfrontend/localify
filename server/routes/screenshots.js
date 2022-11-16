const router = require('express').Router()

const syncDB = require('../middleware/syncDB')
const uploadScreenshots = require('../middleware/upload-screenshots')

const screenshotsControllers = require('../controllers/screenshots')

router.post(
  '/projects/:projectId/keys/:keyId/screenshots',
  syncDB,
  uploadScreenshots.array('files'),
  screenshotsControllers.createScreenshot
)
router.delete(
  '/projects/:projectId/keys/:keyId/screenshots/:screenshotId',
  syncDB,
  screenshotsControllers.removeScreenshot
)

module.exports = router
