import { Alert } from "@mui/material"
import { useNotication } from "../store"
const Notification = () => {
  const { Message, Success } = useNotication()
  if (Message === null || Message === undefined) return null

  return <Alert severity={Success ? "success" : "error"}>{Message}</Alert>
}

export default Notification
