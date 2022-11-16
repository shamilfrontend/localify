const signIn = require('./signIn')
const createUser = require('./createUser')

module.exports = async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password) {
    return res.status(404).json({
      message: 'Некорретные данные'
    })
  }

  try {
    if (name) {
      const result = await createUser(req)

      if (result.code && result.code === 409) {
        res.status(404).json({
          message: 'Такой Email уже занят'
        })
      } else {
        res.status(200).json(result)
      }
    } else {
      const result = await signIn(req, email)

      if (result) {
        res.status(200).json(result)
      } else {
        res.status(404).json({
          message: 'Ошибка при авторизации'
        })
      }
    }
  } catch (e) {
    console.log('signIn ----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
