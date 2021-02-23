const express = require('express')
const app = express()

let prices = [
  {
    "boxCount": 1,
    "packCount": 2,
    "barCount": 6,
    "totalPrice": 293.8
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Welcome to browse chocolate prices!</h1>')
})

app.get('/price', (request, response) => {
  response.json(prices)
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
