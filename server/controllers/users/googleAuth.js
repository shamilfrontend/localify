const bcrypt = require('bcryptjs')
const randomColor = require('randomcolor')
const generatePassword = require('generate-password')
const nodeMailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')
const googleRegister = require('../../emails/googleRegister')
const { SEND_GRID_API_KEY } = require('../../config')
const createToken = require('./signIn/createToken')

const options = {
  auth: {
    api_key: SEND_GRID_API_KEY
  }
}
const mailer = nodeMailer.createTransport(sgTransport(options))

module.exports = async (req, res) => {
  const email = req.user.emails[0].value
  let resultToken = null

  try {
    const candidate = await req.db.User.findOne({ where: { email } })

    if (candidate) {
      const token = createToken(
        candidate.id,
        candidate.email,
        candidate.password
      )

      candidate.token = token
      await candidate.save()
      resultToken = token
    } else {
      const salt = bcrypt.genSaltSync(10)
      const password = generatePassword.generate({
        length: 10,
        numbers: true
      })

      const user = await req.db.User.create({
        email,
        name: req.user.displayName,
        password: bcrypt.hashSync(password, salt),
        color: randomColor()
      })

      const token = createToken(user.id, user.email, user.password)
      user.token = token
      await user.save()
      resultToken = token

      await mailer.sendMail(googleRegister(email, password))
    }

    res
      .status(200)
      .cookie('jwt-token', resultToken)
      .redirect('/')
  } catch (e) {
    console.log('googleAuth ----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
