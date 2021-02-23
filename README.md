# ChokoApi

API to get the cheapest chocolate prices by combining boxes, packs and bars.

The API receives the number of chocolate bars needed by the user, the prices of bars, packs and boxes, and the number of bars included in a pack and box.
The API then returns the cheapest combination of boxes, packs and individual bars to satisfy the requirement, as well as the total price.

At the moment the implementation assumes that the chocolates are cheapest in boxes, and most expensive as bars.

Example usage:

POST /price
{
  "count": 150,
  "barPrice": 2.3,
  "packPrice": 25,
  "boxPrice": 230,
  "packSize": 12,
  "boxSize": 120
}


Start application in [local mode](http://localhost:3003/):

```
npm start
```


Start application in [development mode](http://localhost:3003/):
```
npm run dev
```
