import { useState } from 'react'


const useInput = (validateValue) => {
  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)

  const valueValid = validateValue(value)
  const valueHasError = touched && !valueValid

  const valueInputHandler = (e) => {
    setValue(e.target.value)
  }

  const valueInputBlurHandler = () => {
    setTouched(true)
    if (!valueValid) {
      return
    }
  }
  const reset = () => {
    setValue('')
    setTouched(false)
  }
  return {
    value, valueValid, valueHasError, touched, setTouched, valueInputHandler, valueInputBlurHandler, reset
  }
}


export default useInput
