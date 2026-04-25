const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const BlogRouter = require('./controllers/blogs')
const { unknownEndpoint, errorHandler } = require('./utils/middleware')

mongoose.connect(
  config.MONGODB_URI,
  { family: 4 }
)
  .then(() => logger.info('db connected'))
  .catch((error) => logger.error('error connection to MongoDB:', error.message))

const app = express()
app.use(express.json())

app.use('/api/blogs', BlogRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app