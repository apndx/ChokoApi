const express = require('express')
const { maxHeaderSize } = require('http')
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

    console.log(packPriceSingle, boxPriceSingle, barPrice)
    console.log(Math.max(...prices))
    if (Math.max(...prices) === barPrice && Math.min(...prices) === boxPriceSingle) {
      // In this case the boxes are cheapest, and the bars are most expensive
      const boxCount = Math.floor(count / boxSize)
      const packCount = Math.floor((count % boxSize) / packSize)
      const barCount = (count % boxSize) % packSize

      const totalPrice = boxCount * boxPrice + packCount * packPrice + barCount * barPrice

      const priceResponse = {
        'boxCount': boxCount,
        'packCount': packCount,
        'barCount': barCount,
        'totalPrice': totalPrice
      }
      response.json(priceResponse)

    } else if (Math.max(...prices) === packPriceSingle && Math.min(...prices) === boxPriceSingle) {
      // in this case the boxes are the cheapest and the packs are most expensive
      const boxCount = Math.floor(count / boxSize)
      const packCount = 0
      const barCount = count % boxSize
      const totalPrice = boxCount * boxPrice + barCount * barPrice

      const priceResponse = {
        'boxCount': boxCount,
        'packCount': packCount,
        'barCount': barCount,
        'totalPrice': totalPrice
      }
      response.json(priceResponse)

    } else if (Math.min(...prices) === packPriceSingle) {
      // in this case the packs are cheapest
      const boxCount = 0
      const packCount = Math.floor(count / packSize)
      const barCount = count / packSize
      const totalPrice = packCount * packPrice + barCount * barPrice

      const priceResponse = {
        'boxCount': boxCount,
        'packCount': packCount,
        'barCount': barCount,
        'totalPrice': totalPrice
      }
      response.json(priceResponse)
    } else if (Math.min(...prices) === barPrice) {
      // in this case the single bars are the cheapest option
      const boxCount = 0
      const packCount = 0
      const barCount = count
      const totalPrice = barCount * barPrice

      const priceResponse = {
        'boxCount': boxCount,
        'packCount': packCount,
        'barCount': barCount,
        'totalPrice': totalPrice
      }
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

