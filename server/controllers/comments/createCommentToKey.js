module.exports = async (req, res) => {
  const { userId, message } = req.body
  const { keyId } = req.params

  if (!keyId || !userId || !message) {
    return res.status(404).json({
      message: 'Переданы некорректные данные'
    })
  }

  try {
    const comment = await req.db.Comment.create({
      t_key_id: keyId,
      user_id: userId,
      message
    })

    const { color, name } = req.user

    res.status(200).json({
      id: comment.id,
      userId: comment.UserId,
      keyId: comment.TKeyId,
      message: comment.message,
      createdAt: comment.createdAt,
      color,
      name
    })
  } catch (e) {

    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}
