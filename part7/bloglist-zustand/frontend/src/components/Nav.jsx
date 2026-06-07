import { Link, useNavigate } from "react-router-dom"
import { AppBar, Toolbar, Button, Typography } from "@mui/material"
import { useUser } from "../store"
const Nav = () => {
  const navigation = useNavigate()
  const { user, clear } = useUser()
  const Logout = () => {
    clear()
    navigation("/")
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" style={{ flex: 1, margin: "0 10px" }}>
          Blog App
        </Typography>
        <Button color="inherit" component={Link} to={"/"}>
          blogs
        </Button>
        {user === null && (
          <Button color="inherit" component={Link} to={"/login"}>
            login
          </Button>
        )}
        {user && (
          <Button color="inherit" component={Link} to={"/create"}>
            create new
          </Button>
        )}

        {user !== null && (
          <Button color="inherit" onClick={Logout}>
            logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
export default Nav
