import ContentLoader from 'react-content-loader'

import classes from './Cart.module.css'
import OrderedItems from './OrderedItems'

const OrderCompleteView = (props) => {
  const closeCompleteOrderView = () => {
    props.onCloseOrderView()
    props.onSubmition() //for reseting the cartitems from the context
  }
  const orders = props.orders.map(item =>
    <OrderedItems
      amount={item.amount.toFixed(2)}
      name={item.name}
      price={item.price}
    />)

  const orderView = <>
    <h3>Your Order is complete</h3>
    <hr />
    {orders}
    <h3 >Total: ${props.totalAmount}</h3>
    <p>Sending to <span className={classes.addressSpan}>{props.address.name}</span> who is currently at <span className={classes.addressSpan}>{props.address.address} </span>postalCode- <span className={classes.addressSpan}>{props.address.postalCode}</span></p>
    <div className={classes.actions}>
      <button type="button" className={classes.button} onClick={closeCompleteOrderView}>close</button>
    </div>
  </>


  return (<>
    {props.isLoading &&
      <ContentLoader
        backgroundColor={'lightgrey'}
        foregroundColor={'grey'}
        width={700}
        height={280}
      >
        <rect x="0" y="20" rx="1" ry="1" width="200" height="30" />
        <rect x="0" y="60" rx="1" ry="1" width="600" height="4" />
        <rect x="0" y="90" rx="1" ry="1" width="200" height="30" />
        <rect x="0" y="150" rx="1" ry="1" width="100" height="30" />
        <rect x="0" y="210" rx="3" ry="3" width="550" height="30" />
      </ContentLoader>
    }
    {!props.isLoading && orderView}
  </>)
}

export default OrderCompleteView
