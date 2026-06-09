import { useReducer, createContext, useContext } from "react";


const NotificationContext = createContext()

export default NotificationContext

const reducer = (state, prop) => {}
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer( reducer, { message:null, success: true })

  return (
    <NotificationContext.Provider value={{state, dispatch}}>
        {children}
    </NotificationContext.Provider>
  )

}

export const useNotify = () => useContext(NotificationContext)