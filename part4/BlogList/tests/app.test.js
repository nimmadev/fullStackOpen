const supertest = require('supertest')
const app = require('../app')
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const { default: mongoose } = require('mongoose')
const helper = require('./app_helper')

beforeEach(async () => {
  await helper.freshDb()
})
const api = supertest(app)

test('api retrun correct amount of blogs as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  assert.strictEqual(blogs.length, helper.initalPersons.length)
})

after(async () => {
  await mongoose.connection.close()
})