import { useState } from "react"
import loginService from "../services/login"
import blogsService from "../services/blogs"
import { useNavigate } from "react-router-dom"
import { Typography, InputLabel, Input, Button } from "@mui/material"
import { useNotify } from "../hooks/notificationHook"
import { useUser } from "../hooks/userHook"
import presistentUser from "../services/persistentUser"
import { useField } from "../hooks/useField"

const LoginForm = () => {
  const { setUser } = useUser()
  const username = useField("text")
  const password = useField("text")

  const { updateNotification } = useNotify()
  const navigate = useNavigate()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const data = await loginService.login({
        username: username.value,
        password: password.value,
      })
      setUser(data)
      presistentUser.saveUser(data)
      blogsService.setToken(data.token)
      navigate("/")
    } catch (e) {
      updateNotification({ message: e.response.data.error, success: false })
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <Typography variant="h4">log in to application</Typography>
      <div>
        <InputLabel>
          username <Input {...username} />
        </InputLabel>
      </div>
      <div>
        <InputLabel>
          password <Input {...password} />
        </InputLabel>
      </div>
      <Button variant="contained" style={{ marginTop: "10px" }} type="submit">
        Login
      </Button>
    </form>
  )
}

export default LoginForm
