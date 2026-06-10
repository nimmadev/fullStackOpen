import { useMatch, useNavigate } from "react-router-dom"
import { Box, Link, Paper, Typography, Button } from "@mui/material"
import { useBlog } from "./useBlog"
import { useUser } from "../hooks/userHook"
import { useNotify } from "../hooks/notificationHook"
import { Comments } from "./Comments"

const Blog = () => {
  const { user, Logout } = useUser()
  const { data: blogs, deleteB, like: likeBlog } = useBlog()
  const navigate = useNavigate()
  const { updateNotification } = useNotify()
  const blogId = useMatch("/blogs/:id")
  const blog = blogId ? blogs.find((b) => b.id === blogId.params.id) : null

  if (!blog) {
    return null
  }
  console.log(blog)
  const updateLike = (blog) => {
    const data = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    likeBlog.mutate(data, {
      onError: (e) => {
        if (e?.response?.data?.error === "token expired") {
          Logout()
          navigate("/login")
        }
        updateNotification({
          message: e.response.data.error,
          success: false,
        })
      },
    })
  }

  const deleteBlog = async () => {
    try {
      const confirm = window.confirm(
        `remove blog ${blog.title} by ${blog.author}`,
      )
      if (confirm) {
        deleteB.mutate(blog.id, {
          onSuccess: () => navigate("/"),
          onError: (e) => {
            if (e?.response?.data?.error === "token expired") {
              Logout()
              navigate("/login")
            }
            updateNotification({
              message: e.response.data.error,
              success: false,
            })
          },
        })
      }
    } catch (e) {
      console.log(e, "error")
    }
  }
  const BlogDetail = () => {
    const isUser = blog.user.username === user?.username
    // console.log(isUser)
    return (
      <>
        <Link href={blog.url} style={{ margin: 0 }}>
          {blog.url}
        </Link>
        <Box sx={{ color: "grey" }}>
          likes {blog.likes}{" "}
          {user && (
            <Button variant="contained" onClick={() => updateLike(blog)}>
              like
            </Button>
          )}
        </Box>
        <p>added by {blog.author}</p>
        <p style={{ margin: 0 }}>{blog.user.name}</p>
        {isUser && (
          <Button
            variant="contained"
            color="error"
            onClick={deleteBlog}
            style={{ background: "red" }}
          >
            delete
          </Button>
        )}
        <Comments comments={blog.comments} blogId={blog.id} />
      </>
    )
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <Paper style={blogStyle}>
      <Typography variant="h3">{blog.title}</Typography>
      <BlogDetail />
    </Paper>
  )
}

export default Blog
