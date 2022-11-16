const config = require('../config')

module.exports = function(to, token = '') {
  return {
    to,
    from: config.ADMIN_EMAIL,
    subject: 'Вы зарегистрировались в системе',
    html: `
    <p>Добрый день!</p>
    <p>
      Для подтверждения регистрации в сервисе «${config.APP_NAME}» перейдите
      <a href="${config.BASE_URL}/users/email-confirm?token=${token}" target="_blank" rel="noopener noreferrer">по ссылке</a>.
    </p>
    <p>Если письмо пришло к вам по ошибке, игнорируйте его.</p>
    <br>
    <p>С уважением команда «<a href="${config.BASE_URL}" target="_blank" rel="noopener noreferrer">${config.APP_NAME}</a>».</p>
    `
  }
}
