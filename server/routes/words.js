const router = require('express').Router()

const syncDB = require('../middleware/syncDB')
const wordsControllers = require('../controllers/words')

router.post(
  '/projects/:projectId/keys/:keyId/words',
  syncDB,
  wordsControllers.createWord
)
router.put(
  '/projects/:projectId/keys/:keyId/words/:wordId',
  syncDB,
  wordsControllers.updateWord
)

module.exports = router
