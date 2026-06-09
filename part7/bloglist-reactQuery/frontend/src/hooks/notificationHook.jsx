import { useReducer, createContext, useContext } from "react"

const NotificationContext = createContext()

const baseState = {
  message: null,
  success: true,
}

const reducer = (state, action) => ({
  ...state,
  ...action,
})

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, baseState)

  const updateNotification = (data) => {
    dispatch(data)

    setTimeout(() => {
      dispatch(baseState)
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ state, updateNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotify = () => useContext(NotificationContext)
