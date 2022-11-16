module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'token', Sequelize.TEXT)
  },

  down(queryInterface) {
    return queryInterface.removeColumn('Users', 'token')
  }
}
