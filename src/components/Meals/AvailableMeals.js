import { useState, useEffect } from 'react'

import Card from '../UI/Card.js'
import MealItem from './MealItem/MealItem.js'
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState('')

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://dataforthefoodapp-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json')
      const responseData = await response.json()

      if (!response.ok) {
        throw new Error("Somthing gone wrong dude hack and fix it")
      }

      const loadedMeals = []
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch((error) => {
      setHttpError(error.message)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <section className={classes.mealIsLoading}>
        <p>Loading dude chill.....</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes.httpError}>
        <p>This is An Error u moron try a good address</p>
      </section>
    )
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{meals.length > 0 && mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
