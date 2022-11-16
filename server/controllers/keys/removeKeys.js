const removeScreenshotFile = require('../../utils/removeScreenshotFile')

module.exports = async (req, res) => {
  const { keyIds } = req.body

  if (!keyIds.length) {
    return res.status(404).json({
      message: 'Необходимо выбрать ключи'
    })
  }

  try {
    for (const id of keyIds) {
      const key = await req.db.TKey.findByPk(id)

      // удаление связанных слов
      for (const word of await key.getTWords()) {
        await word.destroy()
      }

      // удаление связанных скриншотов
      for (const screenshot of await key.getScreenshots()) {
        await screenshot.destroy()
        await removeScreenshotFile(screenshot.path)
      }

      await key.destroy()
    }

    if (keyIds === 1) {
      return res.status(200).json({
        message: 'Ключ удален'
      })
    }

    res.status(200).json({
      message: 'Ключи удалены'
    })
  } catch (e) {
    console.log('removeKeys -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
