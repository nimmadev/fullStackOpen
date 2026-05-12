import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogFrom'



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
      <LoginForm setUser={setUser} />
    </div>
  }

  return (
    <div>

      <h2>blogs</h2>
      <p>{user.name} Logged in <span onClick={Logout}>logout</span></p>
      <CreateBlogForm user={user} />
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </div >
  )
}

export default App