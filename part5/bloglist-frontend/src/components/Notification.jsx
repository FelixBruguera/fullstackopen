const Notification = ({ message, type}) => {
    if (!message) { return null}
    return <p className={`message ${type}`}>{message}</p>
}

export default Notification