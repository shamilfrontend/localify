const getLanguages = async (req, res) => {
  try {
    const languages = await req.db.Language.findAll()
    res.status(200).json(languages)
  } catch (e) {
    console.log('getLanguages -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}

module.exports = { getLanguages }
