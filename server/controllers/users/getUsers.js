const validator = require('email-validator')

module.exports = async (req, res) => {
  const { email } = req.params

  if (!validator.validate(email)) {
    return res.status(200).json([])
  }

  try {
    const sourceUsers = await req.db.User.findAll({
      where: {
        email
      }
    })

    const users = sourceUsers.map(({ id, name, email }) => ({
      id,
      name,
      email
    }))

    res.status(200).json(users)
  } catch (e) {
    console.log('getUsers -------', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
