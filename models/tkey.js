module.exports = (sequelize, DataTypes) => {
  const TKey = sequelize.define(
    'TKey',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      underscored: true
    }
  )

  TKey.associate = function(models) {
    TKey.hasMany(models.Comment)
    TKey.hasMany(models.Screenshot)
    TKey.hasMany(models.TWord)
  }

  return TKey
}
