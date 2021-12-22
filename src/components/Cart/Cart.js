import { useContext, useState, useEffect } from 'react'

import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../Store/cart-context'
import CartItem from './CartItem.js'
import CheckoutForm from './CheckoutForm'
import OrderCompleteView from './OrderCompleteView'

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0
  const [checkOutToggle, setCheckOutToggle] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [address, setAddress] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 2000);

    return () => { clearTimeout(timeout) }
  }, [checkOutToggle, orderComplete])

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItems = <ul className={classes['cart-items']}>{
    cartCtx.items.map(item => <CartItem
      name={item.name}
      price={item.price}
      amount={item.amount}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
    />)
  }
  </ul>

  const checkOutHandler = () => {
    setCheckOutToggle((prev) => !prev)
  }
  const orderCompleteHandler = () => {
    setOrderComplete(true)
  }
  const orderCompleteCloseHandler = () => {
    setOrderComplete(false)
    props.onClose()
  }
  const addressHandler = (name, address, postalCode) => {
    setAddress({ name: name, address: address, postalCode: postalCode })
  }
  const cartContent =
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button onClick={checkOutHandler} className={classes.button}>Order</button>}
      </div>
    </>

  return (
    <Modal onClose={props.onClose}>
      {!checkOutToggle && !orderComplete && cartContent}
      {checkOutToggle && !orderComplete &&
        <CheckoutForm
          onCart={checkOutHandler}
          onClose={props.onClose}
          onOpenOrderView={orderCompleteHandler}
          onSend={addressHandler}
          isLoading={isLoading}
        />}
      {checkOutToggle && orderComplete &&
        < OrderCompleteView
          onSubmition={cartCtx.reset}
          onClose={props.onClose}
          onCloseOrderView={orderCompleteCloseHandler}
          orders={cartCtx.items}
          totalAmount={cartCtx.totalAmount}
          address={address}
          isLoading={isLoading}
        />}
    </Modal>
  )
}

export default Cart
