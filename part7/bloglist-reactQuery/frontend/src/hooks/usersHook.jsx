import { createContext, useContext, useEffect, useState } from "react"
import usersService from "../services/users"

const usersContext = createContext()

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    // fetchUsers
    usersService.getAll().then((data) => setUsers(data))
  }, [])

  return (
    <usersContext.Provider value={{ users, setUsers }}>
      {children}
    </usersContext.Provider>
  )
}

export const useUsers = () => useContext(usersContext)
