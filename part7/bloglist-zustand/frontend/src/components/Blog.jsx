import { useState } from "react"
import blogService from "../services/blogs"
import { useNavigate } from "react-router-dom"
import { Box, Link, Paper, Typography, Button } from "@mui/material"

const Blog = ({ blog, user, updateLike }) => {
  const [likes, setlikes] = useState(blog?.likes || null)
  const navigate = useNavigate()
  if (!blog) {
    return null
  }
  // console.log(user)

  const deleteBlog = async () => {
    try {
      const confirm = window.confirm(
        `remove blog ${blog.title} by ${blog.author}`,
      )
      if (confirm) {
        await blogService.deleteBlog(blog.id)
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
          likes {likes || blog.likes}{" "}
          {user && (
            <Button
              variant="contained"
              onClick={async () => {
                const result = await updateLike(blog)
                if (result) setlikes(result.likes)
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
