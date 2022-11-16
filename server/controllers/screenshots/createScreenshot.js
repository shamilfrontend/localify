const { SCREENSHOTS_MIME_TYPES } = require('../../config')

module.exports = async (req, res) => {
  const { keyId } = req.params

  if (!keyId) {
    return res.status(404).json({
      message: 'Ошибка при загрузке. Выбран не допустимый формат файла'
    })
  }

  const filteredFiles = req.files.filter((file) =>
    SCREENSHOTS_MIME_TYPES.includes(file.mimetype)
  )

  if (!filteredFiles.length) {
    return res.status(404).json({
      message: 'Ошибка при загрузке. Выбран не допустимый формат файла'
    })
  }

  try {
    const screenshots = []

    for (const file of req.files) {
      const screenshot = await req.db.Screenshot.create({
        t_key_id: keyId,
        path: file.filename
      })

      screenshots.push({
        id: screenshot.id,
        path: screenshot.path,
        keyId: screenshot.TKeyId
      })
    }

    res.status(200).json({
      keyId,
      screenshots
    })
  } catch (e) {
    console.log('createScreenshot -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
