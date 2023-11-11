const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//搜尋餐廳
router.get('/', (req, res) => {

  if (!req.query.keywords) {
    return res.redirect('/')
  }//搜尋欄的空值的時候，重新導向跟目錄

  const keywords = req.query.keywords
  const keyword = keywords.trim().toLowerCase() //移除起始結尾的空白字元

  Restaurant.find()
    .lean()
    .then(restaurantsData => {
      const restaurantSearch = restaurantsData.filter(data =>
        data.name.toLowerCase().includes(keyword) ||
        data.category.includes(keyword)
      )
      res.render('index', { restaurants: restaurantSearch, keyword: keywords })

    })
    .catch(error => console.log(error))
})


module.exports = router