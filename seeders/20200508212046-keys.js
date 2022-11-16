module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('T_Keys', [
      {
        project_id: 1,
        name: 'welcome',
        description: 'welcome description',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        project_id: 1,
        name: 'site_name',
        description: 'site_name description',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        project_id: 1,
        name: 'site_search_placeholder',
        description: 'site_search_placeholder description ',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        project_id: 1,
        name: 'footer_copyright',
        description: 'footer_copyright description',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('T_Keys', null, {})
  }
}
