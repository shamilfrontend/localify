const { PROJECT_OWNER_ROLE } = require('../server/config')

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Members',
      [
        {
          role: PROJECT_OWNER_ROLE,
          user_id: 1,
          project_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          role: PROJECT_OWNER_ROLE,
          user_id: 1,
          project_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          role: PROJECT_OWNER_ROLE,
          user_id: 1,
          project_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          role: PROJECT_OWNER_ROLE,
          user_id: 1,
          project_id: 4,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Members', null, {})
  }
}
