module.exports = async (req, res) => {
  if (!req.params.reset_token) {
    return res.status(404).json({
      message: 'Необходимо передать токен'
    })
  }

  try {
    const candidate = await req.db.User.findOne({
      where: {
        reset_token: req.params.reset_token
      }
    })

    if (!candidate) {
      return res.status(404).json({
        message: 'Пользователь не найден'
      })
    }

    if (Date.now() > new Date(candidate.reset_token_exp).getTime()) {
      return res.status(404).json({
        message: 'Время жизни токена вышло'
      })
    }

    res.status(200).json({
      userId: candidate.id
    })
  } catch (e) {
    console.log('resetPassword -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
