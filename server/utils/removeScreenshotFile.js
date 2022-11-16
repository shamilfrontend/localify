const fs = require('fs')
const path = require('path')

const screenshotDir = '../../client/static/screenshots/'

const removeScreenshotFile = (screenshot) => {
  return new Promise((resolve, reject) => {
    const fileToBeDeleted = path.resolve(__dirname, screenshotDir, screenshot)

    fs.unlink(fileToBeDeleted, (err) => {
      if (err) {
        reject(new Error('error'))
        return
      }

      resolve()
    })
  })
}

module.exports = removeScreenshotFile
