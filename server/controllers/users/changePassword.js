const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {
  const { currentPassword, newPassword } = req.body
  const { userId } = req.params

  try {
    const candidate = await req.db.User.findOne({ where: { id: userId } })

    if (!candidate) {
      return res.status(404).json({
        message: 'Пользователь не найден'
      })
    }

    const isCorrectPassword = bcrypt.compareSync(
      currentPassword,
      candidate.password
    )

    if (!isCorrectPassword) {
      return res.status(404).json({
        message: 'Ошибка при изменении пароля. Обратитесь в службу поддержки'
      })
    }

    const salt = bcrypt.genSaltSync(10)
    candidate.password = bcrypt.hashSync(newPassword, salt)
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
