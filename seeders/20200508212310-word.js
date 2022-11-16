module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'T_Words',
      [
        {
          value: 'Добро пожаловать',
          t_key_id: 1,
          language_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          value: 'Welcome',
          t_key_id: 1,
          language_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('T_Words', null, {})
  }
}
