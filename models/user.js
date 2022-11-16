module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      token: {
        type: DataTypes.TEXT
      },
      reset_token: {
        type: DataTypes.STRING,
        allowNull: true
      },
      reset_token_exp: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      underscored: true
    }
  )

  User.associate = function(models) {
    User.belongsToMany(models.Project, {
      through: models.Member,
      as: {
        singular: 'project',
        plural: 'projects'
      }
    })
  }

  return User
}
