const PORT = 3000

module.exports = {
  PORT: process.env.PORT || PORT,
  BASE_URL: process.env.BASE_URL || `http://localhost:${PORT}`,
  JWT_KEY: process.env.JWT || 'super_key',
  SCREENSHOTS_MIME_TYPES: ['image/png', 'image/jpeg'],
  SEND_GRID_API_KEY:
    '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',
  ADMIN_EMAIL: 'shoma.alisultanov@yandex.ru',
  APP_NAME: 'localify',
  PROJECT_OWNER_ROLE: 0
}
