import { useState, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Togglable = (props) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  useImperativeHandle(props.reference, () => {
    return { toggleVisibility }
  })

  return (
    <div className="flex flex-col lg:flex-row lg:h-15 justify-between items-center w-full lg:w-9/10">
      <Button
        type="button"
        style="light"
        width="min"
        margin="none"
        onClick={() => toggleVisibility()}
      >
        {isVisible ? 'Close' : props.buttonLabel}
      </Button>
      {isVisible ? props.children : <span className="w-3/4"></span>}
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
