import { useState, useEffect } from 'react'
import ContentLoader from 'react-content-loader'

import Header from '../src/components/Layout/Header.js'
import Meals from '../src/components/Meals/Meals'
import Cart from '../src/components/Cart/Cart'
import CartProvider from './Store/CartProvider'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false) }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const showCartHandler = () => {
    setCartIsShown(true)
  }
  const hideCartHandler = () => {
    setCartIsShown(false)
  }
  const content = !isLoading ? <Meals /> :
    <ContentLoader
      backgroundColor={'lightgrey'}
      foregroundColor={'grey'}
      width={1200}
      height={1300}
      style={{ margin: 'auto' }}
    >
      <rect x="31%" y="090" rx="5" ry="5" width="1200" height="90" />
      <rect x="31%" y="190" rx="5" ry="5" width="1200" height="90" />
      <rect x="31%" y="290" rx="5" ry="5" width="1200" height="90" />
      <rect x="31%" y="390" rx="5" ry="5" width="1200" height="90" />
      <rect x="31%" y="490" rx="5" ry="5" width="1200" height="90" />
    </ContentLoader>

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      {content}
    </CartProvider>


  );
}

export default App;

