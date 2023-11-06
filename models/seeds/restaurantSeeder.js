const mongoose = require('mongoose')
const Restaurant = require('../restaurant') //載入restaurant model
const restaurantList = require('../../restaurant.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('running restaurantSeeder script...')

  Restaurant.create(restaurantList.results)
    .then(()=>{
      console.log('restaurantSeeder done')
      db.close()
    })
    .catch(error=>console.log(error))
  
  
})