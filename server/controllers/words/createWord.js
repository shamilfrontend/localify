module.exports = async (req, res) => {
  const { keyId } = req.params
  const { languageId, value } = req.body

  if (!keyId) {
    return res.status(404).json({
      message: 'Переданы некорректные данные'
    })
  }

  if (!value) {
    return res.status(404).json({
      message: 'Введите текст перевода'
    })
  }

  try {
    const word = await req.db.TWord.create({
      value
    })

    const language = await req.db.Language.findByPk(languageId)
    const key = await req.db.TKey.findByPk(keyId)

    await word.setTKey(key)
    await word.setLanguage(language)

    res.status(200).json({
      id: word.id,
      keyId: word.TKeyId,
      languageId: word.LanguageId,
      value: word.value
    })
  } catch (e) {
    console.log('createWord ----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
