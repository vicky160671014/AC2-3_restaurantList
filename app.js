//Include express from node_modules and define server related variables
const express = require('express')
const mongoose = require('mongoose')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const app = express()
const port = 3000

//MONGODB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error',()=>{
  console.log('mongodb error!')
})
db.once('open',()=>{
  console.log('mongodb connected!')
})

//require express-handlebars here
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')

//setting template engine
app.engine('handlebars', exphbs({defaultLayout : 'main'}))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

//Setting route and corresponding response
app.get('/',(req,res)=>{
  Restaurant.find()
    .lean()
    .then(restaurants=>res.render('index',{restaurants}))
    .catch(error=>console.log(error))
})

app.get('/restaurants/:restaurant_id', (req,res)=>{
  const restaurant_id = req.params.restaurant_id
  return Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('show', { restaurant: restaurant }))
    .catch(error=>console.log(error))
})

app.get('/search', (req,res)=>{
  
  if(!req.query.keywords){
    return res.redirect('/')
  }//搜尋欄的空值的時候，重新導向跟目錄

  console.log('req.query.keywords', req.query.keywords)
  const keywords = req.query.keywords
  const keyword = keywords.trim().toLowerCase() //移除起始結尾的空白字元
  const restaurantSearch = restaurantList.results.filter(restaurant => restaurant.name.includes(keyword) || restaurant.category.includes(keyword))
  res.render('index', { restaurants: restaurantSearch, keyword : keywords })
})

//Listen the server
app.listen(port, ()=>{
  console.log(`Express is running on http://localhost:${port}`)
})