const registerUser = require('./registerUser')
const verifyUser = require('./verifyUser')
const resendVerifyEmail = require('./resendVerifyEmail')
const loginUser = require('./loginUser')
const updateSubscriptionUser = require('./updateSubscriptionUser')
const getCurrentUser = require('./getCurrentUser')
const logoutUser = require('./logoutUser')

module.exports = {
  registerUser,
  verifyUser,
  resendVerifyEmail,
  loginUser,
  updateSubscriptionUser,
  getCurrentUser,
  logoutUser,
}