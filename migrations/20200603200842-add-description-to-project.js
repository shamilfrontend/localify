module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Projects', 'description', Sequelize.STRING)
  },

  down(queryInterface) {
    return queryInterface.removeColumn('Projects', 'description')
  }
}
