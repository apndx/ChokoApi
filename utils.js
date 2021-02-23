function priceCalculator(scenario, count, barPrice, packPrice, boxPrice, packSize, boxSize) {
  
  switch (scenario) {
    default: // In this case the boxes are cheapest, and the bars are most expensive
      const boxCountDefault = Math.floor(count / boxSize)
      const packCountDefault = Math.floor((count % boxSize) / packSize)
      const barCountDefault = (count % boxSize) % packSize
      const totalPriceDefault = boxCountDefault * boxPrice + packCountDefault * packPrice + barCountDefault * barPrice
      return {
        'boxCount': boxCountDefault,
        'packCount': packCountDefault,
        'barCount': barCountDefault,
        'totalPrice': totalPriceDefault
      }

    case 1: // In this case the boxes are the cheapest and the packs are most expensive
      const boxCount1 = Math.floor(count / boxSize)
      const barCount1 = count % boxSize
      const totalPrice1 = boxCount1 * boxPrice + barCount1 * barPrice
      return {
        'boxCount': boxCount1,
        'packCount': 0,
        'barCount': barCount1,
        'totalPrice': totalPrice1
      }

    case 2: // In this case the packs are cheapest option
      const packCount2 = Math.floor(count / packSize)
      const barCount2 = count % packSize
      const totalPrice2 = packCount2 * packPrice + barCount2 * barPrice
      return {
        'boxCount': 0,
        'packCount': packCount2,
        'barCount': barCount2,
        'totalPrice': totalPrice2
      }
    case 3: // in this case the single bars are the cheapest option
      const totalPrice = count * barPrice
      return {
        'boxCount': 0,
        'packCount': 0,
        'barCount': count,
        'totalPrice': totalPrice
      }
  }
}

module.exports = {
  priceCalculator
}
