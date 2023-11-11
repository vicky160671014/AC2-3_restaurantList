const Restaurant = require('../restaurant') //載入restaurant model
const restaurantList = require('../../restaurant.json')
const db = require('../../config/mongoose')


db.once('open', () => {
  console.log('running restaurantSeeder script...')

  Restaurant.create(restaurantList.results)
    .then(()=>{
      console.log('restaurantSeeder done')
      db.close()
    })
    .catch(error=>console.log(error))
})