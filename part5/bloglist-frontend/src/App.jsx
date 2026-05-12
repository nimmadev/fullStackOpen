import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const hasUser = window.localStorage.getItem('xyz')
    if (hasUser) setUser(JSON.parse(hasUser))

  }, [])
  const Logout = () => {
    window.localStorage.clear('xyz')
    setUser(null)
  }
  if (user === null) {
    return <div>
      <LoginForm setUser={setUser} />
    </div>
  }
  return (
    <div>

      <h2>blogs</h2>
      <p>{user.name} Logged in <span onClick={Logout}>logout</span></p>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </div >
  )
}

export default App