import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogFrom'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ message: null, success: true })
  const createForm = useRef()
  const setNewMesage = (message, success) => {
    setMessage({ message, success })
    setTimeout(() => setMessage({ message: null, success: true }), 3000)

  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const hasUser = window.localStorage.getItem('xyz')
    if (hasUser) {
      let _user = JSON.parse(hasUser)
      setUser(_user)
      blogService.setToken(_user.token)

    }

  }, [])
  const Logout = () => {
    window.localStorage.clear('xyz')
    setUser(null)
  }

  const updateLike = async (blog) => {
    const { id, ...data } = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
    const result = await blogService.updateBlog(data, id)
    return result
  }
  const handleCreate = async data => {
    try {
      const blog = await blogService.createBlog(data)
      const message = `a new blog ${data.title} by ${data.author} added`
      setMessage(message, true)
      console.log(blog)
      setBlogs(blogs => blogs.concat(blog))
    } catch (e) {
      console.log(e)
      if (e.response.data.error === 'token expired') {
        window.localStorage.clear('xyz')
        navigation.reload()
      }
      setMessage(e.response.data.error, false)

    }
  }
  if (user === null) {
    return <div>
      <Notification Message={message.message} Success={message.success} />
      <LoginForm setUser={setUser} setMessage={setNewMesage} />
    </div>
  }

  return (
    <div>

      <h2>blogs</h2>
      <Notification Message={message.message} Success={message.success} />
      <p>{user.name} Logged in <span onClick={Logout}>logout</span></p>
      <Togglable buttonLabel={'create new blog'} ref={createForm} >
        <CreateBlogForm handleCreate={handleCreate} createRef={createForm} />
      </Togglable>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} updateLike={updateLike} />
        )
      }
    </div >
  )
}

export default App