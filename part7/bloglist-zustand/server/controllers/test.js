const user = require('../models/user')
const blog = require('../models/blog')

const testRouter = require('express').Router()

testRouter.post('/reset', async (request, response) => {
  await blog.deleteMany({})
  await user.deleteMany({})
  response.status(204).end()
})

module.exports = testRouter