import App from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/`

App.container.useProxies(true)

test.group('oooh', (group) => {
  group.before(async () => {
    await Database.beginGlobalTransaction()
  })

  group.after(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Foobar', async (assert) => {
    const { status } = await supertest(BASE_URL).get('')
    assert.deepEqual(status, 200)
  })
})
