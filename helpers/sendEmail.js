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

// const msg = {
//   to: 'aleksandra.selezen@gmail.com', // Change to your recipient
//   from: 'aleksandra.selezen@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
