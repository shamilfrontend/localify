const config = require('../config')

module.exports = function(to, projectId) {
  return {
    to,
    from: config.ADMIN_EMAIL,
    subject: 'Вас добавили в проект',
    html: `
    <p>Добрый день!</p>
    <p>Вас добавили в проект</p>
    <p><a href="${config.BASE_URL}/projects/${projectId}">Открый проект</a></p>
    <br>
    <p>С уважением команда «<a href="${config.BASE_URL}" target="_blank" rel="noopener noreferrer">${config.APP_NAME}</a>».</p>
    `
  }
}
