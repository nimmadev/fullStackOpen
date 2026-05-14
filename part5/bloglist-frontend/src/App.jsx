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
      <Togglable buttonLabel={"create new blog"} ref={createForm} >
        <CreateBlogForm setMessage={setNewMesage} setBlogs={setBlogs} createRef={createForm} />
      </Togglable>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} />
        )
      }
    </div >
  )
}

export default App