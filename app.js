//Include express from node_modules and define server related variables
const express = require('express')
const app = express()
const port = 3000

//require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

//setting template engine
app.engine('handlebars', exphbs({defaultLayout : 'main'}))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

//Setting route and corresponding response
app.get('/',(req,res)=>{
  res.render('index', { restaurants : restaurantList.results})
})

app.get('/restaurants/:restaurant_id', (req,res)=>{
  // console.log('req.params.restaurant_id',req.params.restaurant_id)
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  // console.log(restaurant)
  res.render('show', { restaurant: restaurant })
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