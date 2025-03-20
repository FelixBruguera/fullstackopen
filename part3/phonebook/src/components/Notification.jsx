const Notification = ({ message, type}) => {
    if (message.length === 0) { return null}
    return <p className={`message ${type}`}>{message}</p>
}

export default Notification