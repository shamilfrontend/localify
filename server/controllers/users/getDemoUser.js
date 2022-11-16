module.exports = async (req, res) => {
  try {
    const user = await req.db.User.findOne({
      where: {
        id: 1,
        email: 'demo@mail.ru'
      }
    })

    if (!user) {
      return res.status(404).json({
        message: 'Ошибка при входе в демо-версию'
      })
    }
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      color: user.color,
      token: user.token
    })
  } catch (e) {
    console.log('getDemoUser -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
