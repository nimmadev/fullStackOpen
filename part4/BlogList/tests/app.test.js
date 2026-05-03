const supertest = require('supertest')
const app = require('../app')
const { test, before, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const { default: mongoose } = require('mongoose')
const helper = require('./app_helper')
const User = require('../models/user')

const api = supertest(app)
let token = null
before(async () => {
  try {

    const user = new User({
      username: 'test',
      name: 'test',
      passwordHash: '$2b$10$ZN5fGFGK.KePFRFhDGGKQeYb4OZntDI2BGWnQs5BLjm2C5dHQnkUG'
    })
    await user.save()
  }
  catch { console.log('user alredy present') }
  finally {
    const result = await api.post('/api/login').send({ username: 'test', password: 'test' })
    token = result._body.token
  }
})
beforeEach(async () => {
  await helper.freshBlogDb()
})

test('api return correct amount of blogs as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  assert.strictEqual(blogs.length, helper.initalPersons.length)
})

test('blog json has id key not _id', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogs = await helper.blogsInDb()
  assert.ok(blogs[0].id)
  assert.ok(!blogs[0]._id)

})

test('api create a new blog', async () => {

  // const result = await api.post('/api/login')
  //   .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjY5Zjc5YjEwNDU4NWRkMTI3NWE2MjIwZSIsImlhdCI6MTc3NzgzNDg1NSwiZXhwIjoxNzc3ODM4NDU1fQ.QtB9Z3vm1WDkNmMzWKnYj2LV3TXHzC6K3AloGdkjWUs')
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'test api subject',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    })
    .expect(201)


  const blogs = await helper.blogsInDb()
  const titiles = blogs.map(blog => blog.title)
  assert.strictEqual(titiles.includes('test api subject'), true)
  assert.strictEqual(blogs.length, helper.initalPersons.length + 1)

})

test('api create a new blog with 0 like if likes is missing', async () => {

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'test api subject',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
    })
    .expect(201)

  assert.strictEqual(response.body.likes, 0)

})

test('api does not create a new blog when title or url is missing', async () => {

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 0
    })
    .expect(400)
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'test api subject',
      author: 'Robert C. Martin',
      likes: 0
    })
    .expect(400)

})

test('delete a blog', async () => {
  const blogs = await helper.blogsInDb()
  const id = blogs[0].id
  await api
    .delete(`/api/blogs/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const updatedBlogs = await helper.blogsInDb()
  const ids = updatedBlogs.map(blog => blog.id)
  assert(!ids.includes(id))
  assert.strictEqual(updatedBlogs.length, blogs.length - 1)

})

test('update a blog', async () => {
  const blogs = await helper.blogsInDb()
  const blog = blogs[0]
  await api
    .put(`/api/blogs/${blog.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'test',
      author: 'author',
      likes: 10,
      url: 'test'
    })
    .expect(201)

  const updatedBlogs = await helper.blogsInDb()
  const updatedBlog = updatedBlogs.find(b => b.id === blog.id)
  assert.strictEqual('test', updatedBlog.url)

})
after(async () => {
  await mongoose.connection.close()
})