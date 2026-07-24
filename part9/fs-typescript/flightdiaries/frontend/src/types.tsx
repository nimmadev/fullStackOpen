export type Page = "home" | "add";
export type NotificationContextType = {
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
};
