module.exports = async (req, res) => {
  try {
    await req.project.destroy()
    res.status(204).send()
  } catch (e) {
    console.log('removeProject ----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
