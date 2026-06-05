const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = (total, blog) => total + blog.likes
  return blogs.length === 0 ? 0 : blogs.reduce(likes, 0)
}

const favoriteBlog = (blogs) => {
  const filter = (max, blog) => {
    const fav = blog.likes > max.likes ? blog : max
    return fav
  }
  return blogs.length === 1 ? blogs[0] : blogs.reduce(filter, blogs[0])
}

const mostBlogs = (blogs) => {
  const [author, count] = _.chain(blogs).countBy('author').entries().maxBy(([_, count]) => count).value()
  return { author, count }
}
const mostLikes = (blogs) => {
  return _.chain(blogs).groupBy('author').map((blogs, author) => ({ author, likes: _.sumBy(blogs, 'likes') })).maxBy('likes').value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}