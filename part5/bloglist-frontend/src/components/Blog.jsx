import { useState } from 'react'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, user, updateLike }) => {
  const [likes, setlikes] = useState(blog?.likes || null)
  const navigate = useNavigate()
  if (!blog) { return null }
  // console.log(user)

  const deleteBlog = async () => {
    try {
      const confirm = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
      if (confirm) {

        await blogService.deleteBlog(blog.id)
        navigate('/')
        navigation.reload()
      }
    }
    catch (e) {
      console.log(e, 'error')

    }
  }
  const BlogDetail = () => {
    // console.log(blog.user.username, user?.username)
    const isUser = blog.user.username === user?.username
    // console.log(isUser)
    return <>
      <p style={{ margin: 0 }}>{blog.url}</p>
      <div>likes {likes || blog.likes} {user && <button onClick={async () => {
        const result = await updateLike(blog)
        if (result) setlikes(result.likes)
      }}>like</button>}</div>
      <p>added by {blog.author}</p>
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
    <p>
      {blog.title}
    </p>
    <BlogDetail />
  </div>
}

export default Blog