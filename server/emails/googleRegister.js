const config = require('../config')

module.exports = function(to, password) {
  return {
    to,
    from: config.ADMIN_EMAIL,
    subject: `Вы успешно зарегистрировались в ${config.APP_NAME}`,
    html: `
    <p>Добрый день!</p>
    <p>Вы успешно зарегистрировались в <a href="${config.BASE_URL}" target="_blank" rel="noopener noreferrer">${config.APP_NAME}</a></p>
    <p>Ваш пароль ${password}</p>
    <br>
    <p>С уважением команда «<a href="${config.BASE_URL}" target="_blank" rel="noopener noreferrer">${config.APP_NAME}</a>».</p>
    `
  }
}
