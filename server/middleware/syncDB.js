const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config')
const db = require('../../models/index')

// todo: Refactoring
module.exports = async (req, res, next) => {
  const { authorization } = req.headers

  if (authorization) {
    const token = authorization.slice(7)
    console.log('token: ', token)

    if (!token) {
      return res.status(401).send()
    }

    const { userId } = jwt.verify(token, JWT_KEY)
    console.log('userId: ', userId)

    const user = await db.User.findByPk(userId)

    if (token !== user.token) {
      return res.status(401).send()
    }

    req.user = user

    const { projectId } = req.params
    if (projectId) {
      const [project] = await user.getProjects({
        where: {
          id: projectId
        }
      })

      if (!project) {
        return res.status(403).json({
          message: 'У вас нет доступа к этому проекту'
        })
      }

      req.project = project
    }
  }

  req.db = db
  next()
}
