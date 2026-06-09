import { Alert } from "@mui/material"
import { useNotify } from "../hooks/notificationHook"
const Notification = () => {
  const {state} = useNotify()
  if (state.message === null || state.message === undefined) return null

  return <Alert severity={state.success ? "success" : "error"}>{state.message}</Alert>
}

export default Notification
