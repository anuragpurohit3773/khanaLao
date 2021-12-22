import CartContext from './cart-context.js'
import { useReducer } from 'react'

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedItems;
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
    const existingItemIndex = state.items.findIndex(item => item.id === action.item.id)
    const existingItem = state.items[existingItemIndex]

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount
      }
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === "REMOVE") {
    let updatedItems;
    const existingItemIndex = state.items.findIndex(item => item.id === action.id)
    const existingItem = state.items[existingItemIndex]
    const updatedTotalAmount = state.totalAmount - existingItem.price

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }
  if (action.type === 'RESET') {
    return {
      items: [],
      totalAmount: 0
    }
  }
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)


  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item })
  }

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id })
  }
  const resetItemHandler = () => {
    dispatchCartAction({ type: 'RESET' })
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    reset: resetItemHandler,
  }
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider;
