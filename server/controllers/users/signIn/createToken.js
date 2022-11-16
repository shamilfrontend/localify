const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../../../config')

module.exports = (id = '', email = '', password = '') => {
  return jwt.sign(
    {
      userId: id,
      email,
      password
      // date: new Date()
    },
    JWT_KEY,
    {
      expiresIn: 3600 * 24
    }
  )
}
