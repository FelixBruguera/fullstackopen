import PropTypes from 'prop-types'
import Input from './Input'
import Button from './Button'

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
      <h2 className="font-bold text-lg">Please log in to continue</h2>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex flex-col w-2/4 lg:w-1/4 max-w-100 m-auto gap-3"
      >
        <Input id="username" type="text" name="user" labelText="Username" />
        <Input
          id="password"
          type="password"
          name="password"
          labelText="Password"
        />
        <Button type="submit" style="dark" width="1/2">
          Send
        </Button>
      </form>
    </div>
  )
}
Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default Login
