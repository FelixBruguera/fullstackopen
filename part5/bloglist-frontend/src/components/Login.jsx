import PropTypes from 'prop-types'

const Login = ({ handleLogin }) => {
  const onSubmit = (e) => {
    e.preventDefault()
    const credentials = {
      username: e.target.user.value,
      password: e.target.password.value,
    }
    handleLogin(credentials)
  }

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="username">Username: </label>
        <input
          data-testid="username"
          id="username"
          type="text"
          name="user"
        ></input>
        <label htmlFor="password">Password: </label>
        <input
          data-testid="password"
          id="password"
          type="password"
          name="password"
        ></input>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default Login
