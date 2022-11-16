module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Projects',
      [
        {
          name: 'Airbnb',
          description: 'App for planing your trip',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Dribbble',
          description:
            "Dribbble's official app for iPhone and iPad. Discover and follow the world's best designers.",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Facebook',
          description: 'One of big company in the world',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Apple',
          description: 'Creator your Iphone and MacBook',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Projects', null, {})
  }
}
