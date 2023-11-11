const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//新增餐廳
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//瀏覽特定餐廳
router.get('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  return Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

//瀏覽特定餐廳編輯頁面
router.get('/:restaurant_id/edit', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  return Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

//修改特定餐廳編輯頁面
router.put('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  const restaurantEdit = req.body
  Restaurant.findByIdAndUpdate(restaurant_id, restaurantEdit)
    .then(() => res.redirect(`/restaurants/${restaurant_id}`))
    .catch(error => console.log(error))
})

//刪除餐廳
router.delete('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findByIdAndDelete(restaurant_id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router