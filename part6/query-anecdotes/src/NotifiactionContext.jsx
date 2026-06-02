import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null)

  const updateMessage = (message) => {
    setMessage(message)
    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <NotificationContext.Provider value={{ message, updateMessage }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotify = () => useContext(NotificationContext)