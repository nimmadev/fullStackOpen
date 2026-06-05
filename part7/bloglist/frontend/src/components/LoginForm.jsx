import { useState } from "react"
import loginService from "../services/login"
import blogsService from "../services/blogs"
import { useNavigate } from "react-router-dom"
import { Typography, InputLabel, Input, Button } from "@mui/material"
const LoginForm = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const data = await loginService.login({ username, password })
      setUser(data)
      window.localStorage.setItem("xyz", JSON.stringify(data))
      blogsService.setToken(data.token)
      navigate("/")
    } catch (e) {
      setMessage(e.response.data.error, false)
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <Typography variant="h4">log in to application</Typography>
      <div>
        <InputLabel>
          username{" "}
          <Input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </InputLabel>
      </div>
      <div>
        <InputLabel>
          password{" "}
          <Input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </InputLabel>
      </div>
      <Button variant="contained" style={{ marginTop: "10px" }} type="submit">
        Login
      </Button>
    </form>
  )
}

export default LoginForm
