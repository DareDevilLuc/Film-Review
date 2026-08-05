const express = require('express')
const router = express.Router()
const Review = require('../models/Review.js')

router.get('/', async (req, res) => {
  try{
    const reviews = await Review.find()
    res.json(reviews)
  }
  catch(e){
    console.error(e)
    res.status(500).json({
      response: 'Internal server error'
    })
  }
})

router.get('/:filmId', async (req, res) => {
  const filmId = req.params.filmId
  const film = await Review.findById( filmId )
  res.json(film)
})

router.post('/', async (req, res) => {
  try{
    await Review.create(req.body)
    console.log('New document added in Reviews')
    res.json({response: 'New document added in Reviews'})
  }
  catch(e){
    console.error(e)
    res.status(500).json({
      response: 'Internal server error'
    })
  }
})

module.exports = router
