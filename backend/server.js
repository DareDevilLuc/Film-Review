const cors = require('cors')
const express = require('express')

const app = express()

app.use(cors({
  origin: ['http://localhost:5173']
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Testing this shit')
})


app.get('/products', (req, res) => {
  res.json([
    { id: 1, name: 'Whatever' },
    { id: 2, name: 'Bilat' },
  ])
})

app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id)

  const products = [
    { id: 1, name: 'Whatever' },
    { id: 2, name: 'Bilat' },
  ]

  const requestedProduct = products.find((product) => product.id === id)
  res.json(requestedProduct)
})

app.get('/message', (req, res) => {
  res.json({ message: 'HELLO FROM BACKEND' })
})

app.listen(3000, () => {
  console.log('Server is running')
})
