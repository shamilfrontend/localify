module.exports = (req, res) => {
  try {
    console.log('req.user: ', req.user)
    if (!req.user) {
      return res.status(404).json({
        message: 'Ошибка при получении информации о пользователе'
      })
    }

    res.status(200).json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      color: req.user.color
    })
  } catch (e) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
