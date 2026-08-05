const express = require('express')
const router = express.Router()
const Review = require('../models/Review.js')

router.get('/', async (req, res) => {
  try{
    const reviews = await Review.find().populate('film')
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
  const specificReviews = await Review.find({film: req.params.filmId})
  res.json(specificReviews)
})


router.post('/', async (req, res) => {
  try{
    if(req.body.rating > 10) req.body.rating = 10
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
