const Login = ({ userValue, setUser, passwordValue, setPassword, onSubmit }) => {
    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <label htmlFor="username">Username: </label>
            <input 
                id="username" 
                type="text" 
                value={userValue} 
                onChange={({ target}) => setUser(target.value)}>
            </input>
            <label htmlFor="password">Password: </label>
            <input 
                id="password" 
                type="password" 
                value={passwordValue} 
                onChange={({ target}) => setPassword(target.value)}>
            </input>
            <button type="submit">Send</button>
        </form>
    )
}

export default Login