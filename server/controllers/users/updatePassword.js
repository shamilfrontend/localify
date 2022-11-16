const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {
  try {
    const candidate = await req.db.User.findOne({
      where: {
        id: req.body.userId,
        reset_token: req.body.token
      }
    })

    if (!candidate) {
      return res.status(404).json({
        message: 'Пользователь не найден'
      })
    }

    const salt = bcrypt.genSaltSync(10)
    candidate.password = bcrypt.hashSync(req.body.new, salt)
    candidate.reset_token = null
    candidate.reset_token_exp = null
    await candidate.save()

    // todo: отправить письмо о том, что пароль изменен
    res.status(204).send()
  } catch (e) {
    console.log('updatePassword -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
