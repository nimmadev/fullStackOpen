const Notification = ({ Message, Success }) => {
    if (Message === null) return null

    return <div className={`base-error ${Success ? 'success' : 'error'}`}>
        {Message}
    </div>
}

export default Notification