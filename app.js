//Include express from node_modules and define server related variables
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

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
const routes = require('./routes')

//setting template engine
app.engine('handlebars', exphbs({defaultLayout : 'main'}))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))//body-parser
app.use(methodOverride('_method'))
app.use(routes)//Setting routes

//Listen the server
app.listen(port, ()=>{
  console.log(`Express is running on http://localhost:${port}`)
})