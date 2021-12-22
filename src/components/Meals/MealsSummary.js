import classes from './MealsSummary.module.css'

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>A simple Food App prototype By Anurag Purohit</h2>
      <p>This was created with React, context API and firebase Realtime Storage</p>
      <p>Also the effects for loading is done via an npm repo CONTENT LOADER</p>
    </section>
  )
}
export default MealsSummary
