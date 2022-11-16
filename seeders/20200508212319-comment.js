module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Comments',
      [
        {
          message:
            'Коллеги, добрый день! Начинаем работу над проектом. Мы наняли переводчика, сейчас она присоединится к нам',
          user_id: 1,
          t_key_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          message: 'Добрый день, ждем!',
          user_id: 2,
          t_key_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          message: 'Артур, как думаешь, нужны будут еще переводчики?',
          user_id: 1,
          t_key_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          message: 'Больше да, чем нет, по ходу дела посмотрим',
          user_id: 2,
          t_key_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          message: 'оки)',
          user_id: 1,
          t_key_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          message: 'Ребята привет, я Алина, буду у вас переводчиком)',
          user_id: 3,
          t_key_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          message: 'Алина, привет)',
          user_id: 1,
          t_key_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          message: 'Привет, Алина)',
          user_id: 2,
          t_key_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          message: 'Начинаю переводить)',
          user_id: 3,
          t_key_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          message: ':-)',
          user_id: 2,
          t_key_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          message: ':-)',
          user_id: 1,
          t_key_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Comments', null, {})
  }
}
