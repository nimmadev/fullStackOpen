import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, updateLike }) => {
  const [likes, setlikes] = useState(blog.likes)
  const [isVisible, setIsVisible] = useState(false)
  const ToggleVisibilty = () => setIsVisible(!isVisible)


  const deleteBlog = async () => {
    try {
      const confirm = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
      if (confirm) {

        await blogService.deleteBlog(blog.id)
        navigation.reload()
      }
    }
    catch (e) {
      console.log(e, 'error')

    }
  }
  const BlogDetail = () => {
    const isUser = blog.user.username === user.username
    return <>
      <p style={{ margin: 0 }}>{blog.url}</p>
      <div>{likes} <button onClick={async () => {
        const result = await updateLike(blog)
        if (result) setlikes(result.likes)
      }}>like</button></div>
      <p style={{ margin: 0 }}>{blog.user.name}</p>
      {isUser && <button onClick={deleteBlog} style={{ background: 'red' }}>delete</button>}
    </>
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return <div style={blogStyle}>
    {blog.title} {blog.author}<button onClick={ToggleVisibilty}>{isVisible ? 'hide' : 'show'}</button>
    {isVisible && <BlogDetail />}
  </div>
}

export default Blog