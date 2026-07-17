import { useEffect } from "react";
import { useNotify } from "../hooks/Notifiaction";

export const Notification = () => {
  const [message, setMessage] = useNotify();

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, setMessage]);

  if (!message) return null;

  return <p>{message}</p>;
};
