module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Member',
    {
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3
      },
      user_id: DataTypes.INTEGER,
      project_id: DataTypes.INTEGER
    },
    {
      underscored: true
    }
  )
}
