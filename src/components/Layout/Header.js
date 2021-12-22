import React from 'react'
import mealsImage from '../../Assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton.js'

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Khana App</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} />
      </div>
    </>
  )
}
export default Header
