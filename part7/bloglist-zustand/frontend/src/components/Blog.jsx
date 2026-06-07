import { useNavigate } from "react-router-dom"
import { Box, Link, Paper, Typography, Button } from "@mui/material"
import { useBlogActions, useUser } from "../store"

const Blog = ({ blog }) => {
  const { user } = useUser()
  const { deleteBlog, likeBlog } = useBlogActions()
  const navigate = useNavigate()
  if (!blog) {
    return null
  }
  console.log(blog)

  const handleDelete = async () => {
    try {
      const confirm = window.confirm(
        `remove blog ${blog.title} by ${blog.author}`,
      )
      if (confirm) {
        await deleteBlog(blog.id)
        navigate("/")
        navigation.reload()
      }
    } catch (e) {
      console.log(e, "error")
    }
  }

  const BlogDetail = () => {
    // console.log(blog.user.username, user?.username)
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
            <Button
              variant="contained"
              onClick={async () => {
                await likeBlog(blog)
                // if (result) setlikes(result.likes)
              }}
            >
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
            onClick={handleDelete}
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
