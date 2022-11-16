module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Screenshot',
    {
      path: {
        type: DataTypes.STRING,
        allowNull: false
      },
      t_key_id: DataTypes.INTEGER
    },
    {
      underscored: true
    }
  )
}
