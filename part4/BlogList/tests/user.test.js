const { test, describe, beforeEach, after } = require('node:test')
const supertest = require('supertest')
const assert = require('node:assert')
const helper = require('./app_helper')
const app = require('../app')
const { default: mongoose } = require('mongoose')

const api = supertest(app)

describe('In fresh db', async () => {
  beforeEach(async () => { await helper.freshUserDb() })
  test('User get created', async () => {
    const userStart = await helper.usersInDb()
    await api.post('/api/users')
      .send({
        username: 'nimma',
        name: 'nimma',
        password: 'pass'
      })
      .expect(201)

    const userEnd = await helper.usersInDb()
    const users = userEnd.map(user => user.name)
    assert(users.includes('nimma'))
    assert.strictEqual(userEnd.length, userStart.length + 1)
  })

  test('invalid user are not crerated', async () => {
    const userStart = await helper.usersInDb()
    await api.post('/api/users')
      .send({
        username: 'ni',
        name: 'nimma',
        password: 'pass'
      })
      .expect(400)

    await api.post('/api/users')
      .send({
        username: 'nimma',
        name: 'nimma',
        password: 'ps'
      })
      .expect(400)
    const userEnd = await helper.usersInDb()
    assert.strictEqual(userStart.length, userEnd.length,)
  })
})

after(async () => {
  await mongoose.connection.close()
})