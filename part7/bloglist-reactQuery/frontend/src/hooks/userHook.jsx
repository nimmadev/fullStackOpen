import { createContext, useContext, useEffect, useState } from "react"
import blogService from "../services/blogs"
import presistentUser from "../services/persistentUser"

const userContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const hasUser = presistentUser.getUser()
    if (hasUser) {
      let _user = JSON.parse(hasUser)
      setUser(_user)
      blogService.setToken(_user.token)
    }
  }, [])
  const Logout = () => {
    presistentUser.removeUser()
    setUser(null)
  }
  return (
    <userContext.Provider value={{ user, setUser, Logout }}>
      {children}
    </userContext.Provider>
  )
}

export const useUser = () => useContext(userContext)
