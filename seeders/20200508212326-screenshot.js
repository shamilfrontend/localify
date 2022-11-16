module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Screenshots',
      [
        {
          path: '09052020-225413_411-D1t0K2RW0AAoCnQ.jpg_large.jpeg',
          t_key_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Screenshots', null, {})
  }
}
