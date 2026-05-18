import { useImperativeHandle, useState } from 'react'

const Togglable = (props) => {
  const [isVisible, setIsVisible] = useState(false)

  useImperativeHandle(props.ref, () => { return { toggleVisibility } })
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }
  if (!isVisible) {
    return (
      <div>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
    )
  }
  return (
    <div>
      {props.children}
      <button onClick={toggleVisibility}>cancel</button>
    </div>
  )
}

export default Togglable