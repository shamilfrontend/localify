module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      user_id: DataTypes.INTEGER,
      t_key_id: DataTypes.INTEGER,
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      underscored: true
    }
  )

  Comment.associate = function(models) {
    Comment.belongsTo(models.User)
  }

  return Comment
}
