import { useState, useEffect } from "react"
import { Container } from "@mui/material"
import { Routes, Route, useMatch, Link } from "react-router-dom"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import CreateBlogForm from "./components/CreateBlogFrom"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import Nav from "./components/Nav"
import ErrorBoundary from "./components/ErrorBoundary"
import { useBlog, useBlogActions, useUser } from "./store"

const App = () => {
  const { initUser } = useUser()
  const { init: initBlogs } = useBlogActions()
  const blogs = useBlog()

  const blogId = useMatch("/blogs/:id")
  const blog = blogId ? blogs.find((b) => b.id === blogId.params.id) : null
  console.log(blog)
  useEffect(() => {
    initBlogs()
  }, [initBlogs])

  useEffect(() => {
    initUser()
  }, [initUser])

  return (
    <Container>
      <Nav />
      <Notification />
      <ErrorBoundary>
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <div>
                  <LoginForm />
                </div>
              </>
            }
          />
          <Route
            path="/"
            element={
              <div>
                <h2>blogs</h2>
                <ul>
                  {blogs.map((blog) => (
                    <Link to={`/blogs/${blog.id}`} key={blog.id}>
                      <li>{blog.title}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            }
          />
          <Route path="/blogs/:id" element={<Blog blog={blog} />} />
          <Route path="/create" element={<CreateBlogForm />} />
          <Route path="*" element={<h2>404 - Page not found</h2>} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App
