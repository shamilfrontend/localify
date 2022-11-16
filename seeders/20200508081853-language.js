module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Languages',
      [
        {
          name: 'Русский',
          code: 'ru',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'English',
          code: 'en',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Languages', null, {})
  }
}
