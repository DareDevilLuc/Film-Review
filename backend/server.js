const cors = require('cors')
require('dotenv').config()
const express = require('express')
const connectDB = require('./db/connection.js')

const app = express()

console.log()

app.use(cors({
  origin: ['http://localhost:5173']
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Testing this shit')
})

connectDB()

app.listen(3000, () => {
  console.log('Server is running')

})

