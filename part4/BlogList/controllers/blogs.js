const BlogRouter = require('express').Router()
const Blog = require('../models/blog')



BlogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

BlogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  // const token = jwt.verify(request.token, SECRET)
  // if (!token.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  // const user = await User.findById(token.id)
  // if (!user) {
  //   return response.status(400).json({ error: 'userId missing or not valid' })
  // }
  const user = request.user
  blog.user = user._id
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

BlogRouter.delete('/:id', async (request, response) => {
  // const decodedToken = jwt.verify(request.token, SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  // if (!user) {
  //   return response.status(400).json({ error: 'userId missing or not valid' })
  // }
  const user = request.user
  const id = request.params.id
  if (!user.blogs.includes(id)) {
    return response.status(401).json({ error: 'invalid request' })
  }
  await Blog.findByIdAndDelete(id)
  user.blogs = user.blogs.filter(blogId => blogId !== id)
  await user.save()
  response.status(204).end()
})

BlogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(id)
  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = BlogRouter