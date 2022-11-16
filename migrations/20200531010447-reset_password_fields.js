module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users', 'reset_token', Sequelize.STRING),
      queryInterface.addColumn('Users', 'reset_token_exp', Sequelize.DATE)
    ])
  },

  down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'reset_token'),
      queryInterface.removeColumn('Users', 'reset_token_exp')
    ])
  }
}
