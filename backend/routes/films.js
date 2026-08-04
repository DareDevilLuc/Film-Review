const express = require('express')
const router = express.Router()
const Film = require('../models/Film.js')

router.get('/', async (req, res) => {
  try{
    const films = await Film.find() 
    res.json(films)
  }
  catch(e){
    console.error(e)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
})

router.post('/', async (req, res) => {
  try{
    Film.create(req.body)
    console.log('New document added in Films')
    res.json({response: 'New document added in Films'})
  }
  catch(e){
    console.error(e)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
})


module.exports = router
