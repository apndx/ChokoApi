
const express = require('express')
const { priceCalculator } = require('./utils')
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

    const packPriceSingle = packPrice / packSize
    const boxPriceSingle = boxPrice / boxSize
    const prices = [barPrice, packPriceSingle, boxPriceSingle]

    if (Math.max(...prices) === barPrice && Math.min(...prices) === boxPriceSingle) {
      // Default: In this case the boxes are cheapest, and the bars are most expensive
      priceResponse = priceCalculator(0, count, barPrice, packPrice, boxPrice, packSize, boxSize)
      response.json(priceResponse)

    } else if (Math.max(...prices) === packPriceSingle && Math.min(...prices) === boxPriceSingle) {
      // Case 1: In this case the boxes are the cheapest and the packs are most expensive
      priceResponse = priceCalculator(1, count, barPrice, packPrice, boxPrice, packSize, boxSize)
      response.json(priceResponse)

    } else if (Math.min(...prices) === packPriceSingle) {
      // Case 2: In this case the packs are cheapest
      priceResponse = priceCalculator(2, count, barPrice, packPrice, boxPrice, packSize, boxSize)
      response.json(priceResponse)

    } else if (Math.min(...prices) === barPrice) {
      // Case 3: in this case the single bars are the cheapest option
      const priceResponse = priceCalculator(3, count, barPrice, packPrice, boxPrice, packSize, boxSize)
      response.json(priceResponse)

    } else {
      return response.status(500).json({ error: 'Calculation scenario was not recognised' })
    }

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'Something went wrong...' })
  }

})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

