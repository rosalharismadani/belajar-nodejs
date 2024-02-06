const nodemailer = require('nodemailer')
const { options } = require('../routes/uploadRoutes')
const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT } = process.env

const transport = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

const sendEmail = () => {
  const options = {
    from: 'rosalharis.rtc@gmail.com',
    to: 'rosalharis.rtc@gmail.com',
    subject: 'test email',
    text: 'Hello'
  }
  transport.sendMail(options, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Email send Successfully')
    }
  })
}

module.exports = { sendEmail }