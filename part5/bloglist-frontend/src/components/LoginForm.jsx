import { useState } from "react"
import loginService from "../services/login"
const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    const data = await loginService.login({ username, password })
    setUser(data)
    window.localStorage.setItem('xyz', JSON.stringify(data))
  }
  return < form onSubmit={handleLogin}>
    <h1>log in to application</h1>
    <div>
      <label >
        username <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
      </label>
    </div>
    <div>
      <label >
        password <input type="text" value={password} onChange={({ target }) => setPassword(target.value)} />
      </label>
    </div>
    <button type="submit">Login</button>
  </form >
}

export default LoginForm