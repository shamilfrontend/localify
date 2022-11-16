module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'Project',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: true
    }
  )

  Project.associate = function(models) {
    Project.hasMany(models.TKey)
    Project.belongsToMany(models.User, {
      through: models.Member
    })
    Project.belongsToMany(models.Language, {
      through: models.PLanguage
    })
  }

  return Project
}
