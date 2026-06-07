import { useState } from "react"
import loginService from "../services/login"
import { useNavigate, Navigate } from "react-router-dom"
import { Typography, InputLabel, Input, Button } from "@mui/material"
import { useNotication, useUser } from "../store"
const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { user, setUser } = useUser()
  const { setMessage } = useNotication()
  const navigate = useNavigate()
  if (user !== null) {
    return <Navigate to="/" replace />
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const data = await loginService.login({ username, password })
      setUser(data)
      navigate("/")
    } catch (e) {
      setMessage({ Message: e.response.data.error, Success: false })
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
