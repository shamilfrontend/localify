const signIn = require('./signIn')
const getUsers = require('./getUsers')
const getCurrentUser = require('./getCurrentUser')
const clearToken = require('./clearToken')
const resetPassword = require('./resetPassword')
const updatePassword = require('./updatePassword')
const checkResetToken = require('./checkResetToken')
const getDemoUser = require('./getDemoUser')
const changePassword = require('./changePassword')
const googleAuth = require('./googleAuth')

module.exports = {
  signIn,
  getUsers,
  getCurrentUser,
  clearToken,
  resetPassword,
  updatePassword,
  checkResetToken,
  getDemoUser,
  changePassword,
  googleAuth
}
