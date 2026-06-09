import { useNavigate } from "react-router-dom"
import { Box, Link, Paper, Typography, Button } from "@mui/material"
import { useBlog } from "./useBlog"
import { useUser } from "../hooks/userHook"

const Blog = ({ blog }) => {
  const { user } = useUser()
  const { deleteB, like: likeBlog } = useBlog()
  const navigate = useNavigate()
  if (!blog) {
    return null
  }
  // console.log(user)

  const updateLike = (blog) => {
    const data = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    likeBlog.mutate(data)
  }

  const deleteBlog = async () => {
    try {
      const confirm = window.confirm(
        `remove blog ${blog.title} by ${blog.author}`,
      )
      if (confirm) {
        deleteB.mutate(blog.id, { onSuccess: () => navigate("/") })
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
