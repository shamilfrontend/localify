module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Language',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: true
    }
  )
}
