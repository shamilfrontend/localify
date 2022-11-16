module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.changeColumn('T_Words', 't_key_id', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
      await queryInterface.changeColumn('T_Words', 'language_id', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
      await transaction.commit()
      return Promise.resolve()
    } catch (err) {
      if (transaction) {
        await transaction.rollback()
      }
      return Promise.reject(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.changeColumn('T_Words', 't_key_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: false
      })
      await queryInterface.changeColumn('T_Words', 'language_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: false
      })
      await transaction.commit()
      return Promise.resolve()
    } catch (err) {
      if (transaction) {
        await transaction.rollback()
      }
      return Promise.reject(err)
    }
  }
}
