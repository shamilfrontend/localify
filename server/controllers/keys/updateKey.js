module.exports = async (req, res) => {
  const keyId = Number(req.params.keyId)
  const { name, description } = req.body

  if (!keyId || !name) {
    return res.status(404).json({
      message: 'Переданы некорректные данные'
    })
  }

  try {
    const foundKey = await req.db.TKey.findByPk(keyId)

    if (!foundKey) {
      res.status(404).json({
        message: 'Ключ не найден'
      })
      return
    }

    foundKey.name = name
    foundKey.description = description

    await foundKey.save()

    res.status(200).json({
      keyId: foundKey.id,
      name: foundKey.name,
      description: foundKey.description
    })
  } catch (e) {
    console.log('updateKey ----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
