const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Welcome to browse chocolate prices!</h1>')
})

app.post('/price', async (request, response) => {

  const priceRequest = request.body
  try {
    const count = priceRequest.count
    const barPrice = priceRequest.barPrice
    const packPrice = priceRequest.packPrice
    const boxPrice = priceRequest.boxPrice
    const packSize = priceRequest.packSize
    const boxSize = priceRequest.boxSize

    if ([count, barPrice, packPrice, boxPrice, packSize, boxSize].filter(a => isNaN(Number(a))).length > 0) {
      return response.status(401).json({ error: 'Faulty input' })
    }

    const boxCount = Math.floor(priceRequest.count / priceRequest.boxSize)
    const packCount = Math.floor((priceRequest.count % priceRequest.boxSize) / priceRequest.packSize)
    const barCount = (priceRequest.count % priceRequest.boxSize) % priceRequest.packSize

    const totalPrice = boxCount * priceRequest.boxPrice + packCount * priceRequest.packPrice + barCount * priceRequest.barPrice

    const priceResponse = {
      'boxCount': boxCount,
      'packCount': packCount,
      'barCount': barCount,
      'totalPrice': totalPrice
    }
    response.json(priceResponse)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }

})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
