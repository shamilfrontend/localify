module.exports = async (req, res) => {
  const { keyId, wordId } = req.params
  const { value } = req.body

  if (!keyId || !wordId) {
    return res.status(404).json({
      message: 'Переданы некорректные данные'
    })
  }

  try {
    const word = await req.db.TWord.findByPk(wordId)

    if (!word) {
      res.status(404).json({
        message: 'Слово не найдено'
      })
      return
    }

    word.value = value

    await word.save()

    res.status(200).json({
      id: word.id,
      keyId: word.TKeyId,
      languageId: word.LanguageId,
      value: word.value
    })
  } catch (e) {
    console.log('updateWord -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
