const router = require('express').Router()

const syncDB = require('../middleware/syncDB')
const projectsControllers = require('../controllers/projects')

router.get('/', syncDB, projectsControllers.getProjects)
router.post('/', syncDB, projectsControllers.createProject)
router.get('/:projectId', syncDB, projectsControllers.getProjectById)
router.put('/:projectId', syncDB, projectsControllers.updateProject)
router.delete('/:projectId', syncDB, projectsControllers.removeProject)

module.exports = router
