import PropTypes from 'prop-types'

const Login = ({ user, setUser, password, setPassword, onSubmit }) => {
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="username">Username: </label>
      <input
        id="username"
        type="text"
        value={user}
        onChange={({ target }) => setUser(target.value)}>
      </input>
      <label htmlFor="password">Password: </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}>
      </input>
      <button type="submit">Send</button>
    </form>
  )
}
Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login