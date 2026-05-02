const supertest = require('supertest')
const app = require('../app')
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const { default: mongoose } = require('mongoose')
const helper = require('./app_helper')

beforeEach(async () => {
  await helper.freshBlogDb()
})
const api = supertest(app)

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

  await api
    .post('/api/blogs')
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
    .send({
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 0
    })
    .expect(400)
  await api
    .post('/api/blogs')
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
    .send({
      title: 'test',
      author: 'author',
      likes: 10,
      url: 'test'
    })
    .expect(201)

  const updatedBlogs = await helper.blogsInDb()
  const updatedBlog = updatedBlogs.find(b => b.id === blog.id)
  assert.deepStrictEqual({
    id: blog.id,
    title: 'test',
    author: 'author',
    likes: 10,
    url: 'test'
  }, updatedBlog)

})
after(async () => {
  await mongoose.connection.close()
})