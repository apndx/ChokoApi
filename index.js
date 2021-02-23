const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Welcome to browse chocolate prices!</h1>')
})

app.post('/price', (request, response) => {

  priceRequest = request.body

  boxCount = Math.floor(priceRequest.count / priceRequest.boxSize)
  packCount = Math.floor((priceRequest.count % priceRequest.boxSize) / priceRequest.packSize)
  barCount = (priceRequest.count % priceRequest.boxSize) % priceRequest.packSize

  totalPrice = boxCount * priceRequest.boxPrice + packCount * priceRequest.packPrice + barCount * priceRequest.barPrice

  priceResponse = {
    'boxCount' : boxCount,
    'packCount': packCount,
    'barCount': barCount,
    'totalPrice': totalPrice
  }

  response.json(priceResponse)
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
