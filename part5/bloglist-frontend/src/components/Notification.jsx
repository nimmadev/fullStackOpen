import { Alert } from '@mui/material'
const Notification = ({ Message, Success }) => {
  if (Message === null || Message === undefined) return null

  return <Alert severity={Success ? 'success' : 'error'} >
    {Message}
  </Alert>
}

export default Notification