import PropTypes from 'prop-types'
import Input from './Input'
import Button from './Button'
import { Link } from 'react-router'

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
    <div className="flex flex-col items-center justify-center gap-5 my-5">
      <h2 className="font-bold text-lg text-text-primary">Please log in to continue</h2>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex flex-col w-3/4 lg:w-1/4 max-w-100 m-auto gap-3"
      >
        <Input id="username" type="text" name="user" labelText="Username" />
        <Input
          id="password"
          type="password"
          name="password"
          labelText="Password"
        />
        <div className="flex items-center justify-evenly">
          <Button type="submit" style="dark" className="!w-fit min-w-30 !m-0">
            Send
          </Button>
          <Button type="button" style="light" className="!w-fit min-w-30 !m-0">
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default Login
