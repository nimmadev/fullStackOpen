import { useMatch } from "react-router-dom"
import { useUsers } from "../hooks/usersHook"
import Typography from "@mui/material/Typography"
import ListItem from "@mui/material/ListItem"
import List from "@mui/material/List"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import CircleSharpIcon from "@mui/icons-material/CircleSharp"

const UserBlogList = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return <Typography variant="body1">No blogs added yet.</Typography>
  }

  return (
    <List>
      {blogs.map((blog) => (
        <ListItem key={blog.id}>
          <ListItemIcon>
            <CircleSharpIcon />
          </ListItemIcon>
          <ListItemText primary={blog.title} />
        </ListItem>
      ))}
    </List>
  )
}

export const User = () => {
  const userId = useMatch("/users/:id")
  const { users } = useUsers()
  if (users === null) return null
  const user = users.find((user) => user.id === userId.params.id)
  if (!user) return <Typography variant="h4">User does not exists.</Typography>

  return (
    <>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="h5">added blogs</Typography>
      <List>
        <UserBlogList blogs={user.blogs} />
      </List>
    </>
  )
}
