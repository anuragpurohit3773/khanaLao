import { Fragment } from 'react'
import AvailableMeals from './AvailableMeals.js'
import MealsSummary from './MealsSummary'

const Meals = () => {

  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  )
}
export default Meals
