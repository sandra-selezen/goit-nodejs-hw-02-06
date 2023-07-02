const { User } = require("../../models")

const logoutUser = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: "" })
}

module.exports = logoutUser