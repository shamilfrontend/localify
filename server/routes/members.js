const router = require('express').Router()

const syncDB = require('../middleware/syncDB')
const membersControllers = require('../controllers/members')

router.post(
  '/projects/:projectId/members',
  syncDB,
  membersControllers.addMember
)
router.delete(
  '/projects/:projectId/members/:memberId',
  syncDB,
  membersControllers.removeMember
)
router.put(
  '/projects/:projectId/members/:memberId',
  syncDB,
  membersControllers.updateRole
)

module.exports = router
