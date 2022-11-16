module.exports = async (req, res) => {
  try {
    req.user.token = ''
    await req.user.save()

    return res.status(204).send()
  } catch (e) {
    console.log('clearToken -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
