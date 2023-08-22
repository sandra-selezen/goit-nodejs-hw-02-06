const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')
require('dotenv').config()

const { BASE_URL } = process.env
const { User } = require('../../models')
const { HttpError, sendEmail } = require('../../helpers')

const registerUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw HttpError(409, 'Email in use')
  }

  const hashPassword = await bcrypt.hash(password, 10)
  const verificationToken = nanoid()

  const newUser = await User.create({ ...req.body, password: hashPassword, verificationToken })

  const verifyEmail = {
    to: email,
    subject: 'Activate your GooseTrack account',
    html: `
    <div style="font-family: Arial, sans-serif; width: 100%; background-color: #dcebf7; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 10px;">
        <h1 style="text-align: center; color:#3e85f3; font-size: 32px;"><b>Welcome to GooseTrack!</b></h1>
        <h3 style="text-align: center; color:#171820; font-size: 18px;">We're glad you're here, Sandra 🥳</h3>
        <p style="text-align: center;"><em><span style="color: #171820; font-size: 18px;">Just confirming you're you.</span></em></p>
        <div style="margin: 0 auto; text-align: center;">
        <a target="_blank" style="display: inline-block; margin: 0 auto; font-size: 18px; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;" href="${BASE_URL}/api/users/verify/${verificationToken}">Activate Account</a>
        </div>
        <br>
        <p style="text-align: center; color: #171820; font-size: 18px;">If you didn't sign up for an account, you can safely ignore this email.</p>
        <p style="text-align: center; color: #171820; font-size: 18px;">Best regards,</p>
        <p style="text-align: center; color: #171820; font-size: 18px;">The AugooseTeam</p>
      </div>
    </div>
    `,
  }

  await sendEmail(verifyEmail)

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  })
}

module.exports = registerUser