const crypto = require('crypto')

module.exports = (req, res) => {
  try {
    crypto.randomBytes(32, async (error, buffer) => {
      if (error) {
        return res.status(500).json({
          message: 'Что-то пошло не так'
        })
      }

      const candidate = await req.db.User.findOne({
        where: {
          email: req.body.email
        }
      })

      if (!candidate) {
        return res.status(404).json({
          message: 'Пользователь не найден'
        })
      }

      candidate.reset_token = buffer.toString('hex')
      candidate.reset_token_exp = Date.now() + 60 * 60 * 1000
      await candidate.save()

      // todo: отправить письмо с ссылкой на изменение пароль
      res.status(204).send()
    })
  } catch (e) {
    console.log('resetPassword -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
