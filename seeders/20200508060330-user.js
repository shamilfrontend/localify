const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../server/config')

const demoEmail = 'demo@mail.ru'
const demoUserId = 1
const demoToken = jwt.sign(
  {
    userId: demoUserId,
    email: demoEmail
  },
  JWT_KEY,
  {
    expiresIn: 3600 * 24 * 365 * 5
  }
)

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: demoUserId,
          name: 'Demo',
          email: demoEmail,
          password:
            '$2a$10$0N2/UddliIEHbwlI5RIgyuIg/2XLLyvYoDBu4Qke1yGDX0CZ7nLDS', // 12345678
          color: '#033E6B',
          created_at: new Date(),
          updated_at: new Date(),
          token: demoToken
        },
        {
          name: 'Shamil Alisultanov',
          email: 'shamil@mail.ru',
          password:
            '$2a$10$0N2/UddliIEHbwlI5RIgyuIg/2XLLyvYoDBu4Qke1yGDX0CZ7nLDS',
          color: '#033E6B',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Artur Hidirnabiev',
          email: 'artur@mail.ru',
          password:
            '$2a$10$UcoEqX4FSIYa3yFXEqe51eB6Zw.PKTM.ytR51BRMIHjAYaFwsERGW',
          color: '#9C0808',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Алина Переводчик',
          email: 'translator@mail.ru',
          password:
            '$2a$10$AxhGLw/FPw6.u1Ue4bXqfuUQppxJgOCUBCZS7r8eQxP/DZ9tXYJ3G',
          color: '#de8e43',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('User', null, {})
  }
}
