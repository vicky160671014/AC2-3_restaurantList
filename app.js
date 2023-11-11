//Include express from node_modules and define server related variables
const express = require('express')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

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