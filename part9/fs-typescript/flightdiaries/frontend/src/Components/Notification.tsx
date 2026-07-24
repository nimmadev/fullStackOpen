import { useEffect } from "react";
import { useNotify } from "../hooks/Notification";
import type { NotificationContextType } from "../types";

export const Notification = () => {
  const { message, setMessage } = useNotify() as NotificationContextType;
  console.log();

  useEffect(() => {
    if (!message) return;

    const id = setTimeout(() => {
      setMessage(null);
    }, 5000);

    return () => clearTimeout(id);
  }, [message, setMessage]);

  if (message === null) return null;
  return <p style={{ color: "red" }}>Error: {message}</p>;
};
