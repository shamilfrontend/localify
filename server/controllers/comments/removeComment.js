module.exports = async (req, res) => {
  const { keyId, commentId } = req.params

  if (!keyId || !commentId) {
    return res.status(404).json({
      message: 'Переданы некорректные данные'
    })
  }

  try {
    const comment = await req.db.Comment.findOne({
      where: {
        id: commentId
      }
    })

    if (!comment) {
      return res.status(404).json({
        message: 'Ошибка при удалении комментария'
      })
    }

    await comment.destroy()
    res.status(200).json({
      id: comment.id
    })
  } catch (e) {
    console.log('removeComment -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
