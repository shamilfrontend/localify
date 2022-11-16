module.exports = async (req, res) => {
  const { name, languages } = req.body

  try {
    req.project.name = name

    const langs = []
    for (const languageId of languages) {
      const pLanguage = await req.db.Language.findByPk(languageId)
      langs.push(pLanguage)
    }
    req.project.setLanguages(langs)

    await req.project.save()

    return res.status(200).json({
      name: req.project.name,
      languages: langs
    })
  } catch (e) {
    console.log('updateProject ----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
