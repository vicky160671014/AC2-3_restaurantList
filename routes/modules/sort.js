const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//以sort分類瀏覽全部餐廳
router.get('/:sort', (req, res) => {
  const sortOptions = {
    'nameAsc': 'name',
    'nameDesc': '-name',
    'category': 'category',
    'location': 'location'
  }

  let sortParams = sortOptions[req.params.sort]
  Restaurant.find()
    .lean()
    .sort(sortParams)
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})


module.exports = router