import { useState, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  useImperativeHandle(props.reference, () => {
    return { toggleVisibility }
  })

  if (isVisible) {
    return (
      <div>
        {props.children}
        <button type="button" onClick={() => toggleVisibility()}>
          Close
        </button>
      </div>
    )
  } else {
    return (
      <>
        <button type="button" onClick={() => toggleVisibility()}>
          {props.buttonLabel}
        </button>
      </>
    )
  }
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
