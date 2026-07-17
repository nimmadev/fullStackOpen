import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotify = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  return (
    <NotificationContext.Provider value={[message, setMessage]}>
      {children}
    </NotificationContext.Provider>
  );
};
