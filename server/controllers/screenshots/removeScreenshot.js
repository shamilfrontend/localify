const removeScreenshotFile = require('../../utils/removeScreenshotFile')

module.exports = async (req, res) => {
  const { keyId, screenshotId } = req.params

  if (!keyId || !screenshotId) {
    return res.status(404).json({
      message: 'Ошибка при удалении'
    })
  }

  try {
    const screenshot = await req.db.Screenshot.findOne({
      where: {
        id: screenshotId
      }
    })

    if (!screenshot) {
      return res.status(404).json({
        message: 'Скриншот не найден'
      })
    }

    await removeScreenshotFile(screenshot.path)
    await screenshot.destroy()

    return res.status(204).send()
  } catch (e) {
    console.log('removeScreenshot -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
