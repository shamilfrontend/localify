module.exports = async (req, res) => {
  const { keyId, commentId } = req.params
  const { message } = req.body

  if (!keyId || !commentId || !message) {
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
        message: 'Ошибка при обновлении комментария'
      })
    }

    comment.message = message
    await comment.save()

    res.status(200).json({
      commentId: comment.id,
      message: comment.message
    })
  } catch (e) {
    console.log('updateComment -----', e)
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
