const dotenv = require('dotenv')
const sgMail = require('@sendgrid/mail')

dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (data) => {
  const email = { ...data, from: 'aleksandra.selezen@gmail.com' }
  await sgMail.send(email)
  return true
}

module.exports = sendEmail
