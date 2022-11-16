const router = require('express').Router()

const syncDB = require('../middleware/syncDB')
const controllers = require('../controllers/comments')

router.get(
  '/projects/:projectId/keys/:keyId/comments',
  syncDB,
  controllers.getCommentsByKeyId
)
router.post(
  '/projects/:projectId/keys/:keyId/comments',
  syncDB,
  controllers.createCommentToKey
)
router.delete(
  '/projects/:projectId/keys/:keyId/comments/:commentId',
  syncDB,
  controllers.removeComment
)
router.put(
  '/projects/:projectId/keys/:keyId/comments/:commentId',
  syncDB,
  controllers.updateComment
)

module.exports = router
