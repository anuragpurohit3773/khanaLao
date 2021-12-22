import classes from './OrderedItem.module.css'

const OrderedItems = (props) => {
  return (
    <div className={classes.items}>
      <p>{props.amount} <span className={classes.times}>x</span> {props.name} <span className={classes.amount}>price-${props.amount * props.price.toFixed(2)}</span></p>
    </div>
  )
}

export default OrderedItems


