const { Nuxt, Builder } = require('nuxt')

const config = require('../nuxt.config.js')
const app = require('./app')

config.dev = process.env.NODE_ENV !== 'production'

async function startServer() {
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(nuxt.render)

  try {
    app.listen(port, host, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on http://${host}:${port}`)
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Ошибка при запуске сервера - ', e)
  }
}

startServer()
