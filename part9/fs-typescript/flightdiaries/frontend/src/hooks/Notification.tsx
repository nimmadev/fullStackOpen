import { createContext, useContext, useState, type ReactNode } from "react";
import type { NotificationContextType } from "../types";

const NotificationContext = createContext<NotificationContextType | null>(null);

export const UseNotificationContext = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <NotificationContext value={{ message, setMessage }}>
      {children}
    </NotificationContext>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotify = () => useContext(NotificationContext);
