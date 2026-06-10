import { Container } from "@mui/material"
import { Routes, Route, useMatch, Link } from "react-router-dom"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import CreateBlogForm from "./components/CreateBlogFrom"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import Nav from "./components/Nav"
import ErrorBoundary from "./components/ErrorBoundary"
import { NotificationProvider } from "./hooks/notificationHook"
import { useBlog } from "./components/useBlog"
import { UserProvider } from "./hooks/userHook"
import { Users } from "./components/Users"
import { UsersProvider } from "./hooks/usersHook"
import { User } from "./components/User"

const App = () => {
  const { data, isPending, isError } = useBlog()
  if (isPending) {
    return <div>Loading ....</div>
  }
  if (isError) {
    return <div>blogs service not avilable</div>
  }
  const blogs = data

  return (
    <UsersProvider>
      <UserProvider>
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
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/create" element={<CreateBlogForm />} />
              <Route path="*" element={<h2>404 - Page not found</h2>} />
            </Routes>
          </ErrorBoundary>
        </Container>
      </UserProvider>
    </UsersProvider>
  )
}

export default App
