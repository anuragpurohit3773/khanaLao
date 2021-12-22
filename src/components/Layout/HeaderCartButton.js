import { useContext, useState, useEffect } from 'react'

import CartContext from '../../Store/cart-context'
import CartIcon from '../Cart/CartIcon.js'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
  const [btnBump, setBtnBump] = useState(false)

  const cartCtx = useContext(CartContext)
  const { items } = cartCtx

  const btnCls = `${classes.button} ${btnBump ? classes.bump : ""}`

  const noOfCartItems = items.reduce((curNum, item) => {
    return curNum + item.amount
  }, 0)

  useEffect(() => {
    if (items.length === 0) { return }
    setBtnBump(true)

    const timeout = setTimeout(() => {
      setBtnBump(false)
    }, 300)

    return () => { clearTimeout(timeout) };
  }
    , [items])

  return (
    <button className={btnCls} onClick={props.onClick}>
      <span className={classes.icon}><CartIcon /></span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton;
