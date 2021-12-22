import { useState } from 'react'
import ContentLoader from 'react-content-loader'

import classes from './Cart.module.css'
import useInput from '../../Hooks/use-input'


const CheckoutForm = (props) => {
  const
    { value: name,
      valueValid: nameValid,
      setTouched: setNameWasTouched,
      valueHasError: nameInputInvalid,
      valueInputHandler: nameInputHandler,
      valueInputBlurHandler: nameInputBlurHandler,
      reset: nameReset
    } = useInput((value) => value.trim() !== '')

  const
    { value: address,
      valueValid: addressValid,
      setTouched: setAddressWasTouched,
      valueHasError: addressInputInvalid,
      valueInputHandler: addressInputHandler,
      valueInputBlurHandler: addressInputBlurHandler,
      reset: addressReset
    } = useInput((value) => value.trim() !== '')

  const
    { value: postalCode,
      valueValid: postalCodeValid,
      setTouched: setPostalCodeWasTouched,
      valueHasError: postalCodeInputInvalid,
      valueInputHandler: postalCodeInputHandler,
      valueInputBlurHandler: postalCodeInputBlurHandler,
      reset: postalCodeReset
    } = useInput((value) => /^[0-9]+$/.test(value) && value.length === 6)


  const formHandler = (e) => {
    e.preventDefault()
    if (!nameValid) {
      setNameWasTouched(true)
      return
    }
    if (!addressValid) {
      setAddressWasTouched(true)
      return
    }
    if (!postalCodeValid) {
      setPostalCodeWasTouched(true)
      return
    }
    props.onSend(name, address, postalCode)
    nameReset()
    addressReset()
    postalCodeReset()
    props.onOpenOrderView()
  }

  const toggleToCartHandler = () => {
    props.onCart()
  }

  const errorClassName = nameInputInvalid ? classes.error : classes.input
  const errorClassAddress = addressInputInvalid ? classes.error : classes.input
  const errorClassPostalCode = postalCodeInputInvalid ? classes.error : classes.input


  const form =
    <form className={classes.form} onSubmit={formHandler}>
      <div className={classes.formInputs}>
        <div className={classes.input}>
          <label htmlFor="name">Your name</label>
          <input type="text"
            name="name"
            className={errorClassName}
            value={name}
            onChange={nameInputHandler}
            onBlur={nameInputBlurHandler} />
          {nameInputInvalid && <p className={classes.errorText}>Name  must not be empty and i dont think you are enlightened enough to remain empty....</p>}
        </div>

        <div className={classes.input}>
          <label htmlFor="address">address</label>
          <input type="text"
            name="address"
            value={address}
            className={errorClassAddress}
            onChange={addressInputHandler}
            onBlur={addressInputBlurHandler}
          />
          {addressInputInvalid && <p className={classes.errorText}>Address  must not be empty and you cant say your address is universe man....</p>}
        </div>

        <div className={classes.input}>
          <label htmlFor="postalCode">postal code</label>
          <input type="text"
            name="postalCode"
            className={errorClassPostalCode}
            value={postalCode}
            onChange={postalCodeInputHandler}
            onBlur={postalCodeInputBlurHandler} />
          {postalCodeInputInvalid && <p className={classes.errorText}>Really dude you dont know this?? read some books</p>}
        </div>
      </div>

      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={toggleToCartHandler}>cart</button>
        <button type="submit" className={classes.button} >Order</button>
      </div>
    </form>


  return (
    <>
      {props.isLoading && <ContentLoader
        backgroundColor={'lightgrey'}
        foregroundColor={'grey'}
        width={500}
        height={300}
      >
        <rect x="0" y="20" rx="1" ry="1" width="90" height="10" />
        <rect x="0" y="40" rx="5" ry="5" width="370" height="40" />
        <rect x="0" y="95" rx="1" ry="1" width="90" height="10" />
        <rect x="0" y="125" rx="5" ry="5" width="370" height="40" />
        <rect x="0" y="190" rx="1" ry="1" width="90" height="10" />
        <rect x="0" y="210" rx="5" ry="5" width="370" height="40" />
      </ContentLoader>}

      {!props.isLoading && form}
    </>
  )
}

export default CheckoutForm
