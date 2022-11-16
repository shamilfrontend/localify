module.exports = (sequelize, DataTypes) => {
  const TWord = sequelize.define(
    'TWord',
    {
      language_id: DataTypes.INTEGER,
      t_key_id: DataTypes.INTEGER,
      value: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: true
    }
  )

  TWord.associate = function(models) {
    TWord.belongsTo(models.Language)
    TWord.belongsTo(models.TKey)
  }

  return TWord
}
