const Notification = ({ Message, Success }) => {
  if (Message === null || Message === undefined) return null

  return <div className={`base-message ${Success ? 'success' : 'error'}`}>
    {Message}
  </div>
}

export default Notification