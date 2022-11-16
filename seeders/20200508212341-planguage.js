module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'P_Languages',
      [
        {
          project_id: 1,
          language_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          project_id: 1,
          language_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          project_id: 2,
          language_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          project_id: 2,
          language_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          project_id: 3,
          language_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          project_id: 3,
          language_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          project_id: 4,
          language_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          project_id: 4,
          language_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('P_Languages', null, {})
  }
}
