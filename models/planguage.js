module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'PLanguage',
    {
      language_id: DataTypes.INTEGER,
      project_id: DataTypes.INTEGER
    },
    {
      underscored: true
    }
  )
}
