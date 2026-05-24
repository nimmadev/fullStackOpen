import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useMatch, Link, useNavigate } from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogFrom'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const Header = ({ user, setUser }) => {
  const navigation = useNavigate()
  const Logout = () => {
    window.localStorage.removeItem('xyz')
    setUser(null)
    navigation('/')
  }

  return <div>
    <Link to={'/'}>blogs</Link>{' '}
    {user === null && <Link to={'/login'}>login</Link>}
    {user && <Link to={'/create'}>create new</Link>}
    {user !== null && <button onClick={Logout}>logout</button>}
  </div>
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ message: null, success: true })
  const setNewMesage = (message, success) => {
    setMessage({ message, success })
    setTimeout(() => setMessage({ message: null, success: true }), 3000)

  }
  const blogId = useMatch('/blogs/:id')
  const blog = blogId ? blogs.find(b => b.id === blogId.params.id) : null
  console.log(blog)
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
    console.log(result)
    console.log(blogs)
    let blo = blogs.map(b => b.id === blog.id ? blog : b)
    blo.sort((a, b) => b.likes - a.likes)
    setBlogs(blo)
    return result
  }
  const handleCreate = async data => {
    try {
      const blog = await blogService.createBlog(data)
      const message = `a new blog ${data.title} by ${data.author} added`
      setNewMesage(message, true)
      setBlogs(blogs => blogs.concat(blog))
    } catch (e) {
      console.log(e)
      if (e.response.data.error === 'token expired') {
        setNewMesage(e.response.data.error, false)
        window.localStorage.clear('xyz')
        navigation.reload()
      }
      console.log(e)

    }
  }


  return (
    <>
      <Header user={user} setUser={setUser} />
      <Notification Message={message.message} Success={message.success} />
      <Routes>
        <Route path='/login' element={
          <>
            <div>
              <LoginForm setUser={setUser} setMessage={setNewMesage} />
            </div>
          </>}
        />
        <Route path='/' element={
          <div>
            <h2>blogs</h2>
            <ul>

              {
                blogs.map(blog =>
                  <Link to={`/blogs/${blog.id}`} key={blog.id}><li >{blog.title}</li></Link>
                )
              }
            </ul>
          </div >
        } />
        <Route path='/blogs/:id' element={
          <Blog blog={blog} user={user} updateLike={updateLike} />
        } />
        <Route path='/create' element={<CreateBlogForm handleCreate={handleCreate} />} />
      </Routes >


    </>
  )
}

export default App