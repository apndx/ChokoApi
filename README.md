# ChokoApi

API to get the cheapest chocolate prices by combining boxes, packs and bars.

The API receives the number of chocolate bars needed by the user, the prices of bars, packs and boxes, and the number of bars included in a pack and box.
The API then returns the cheapest combination of boxes, packs and individual bars to satisfy the requirement, as well as the total price.

The calculator compares the prices of single bars in different containers, and recognises four scenarios:

1. Box cheapest, bar most expensive. Combination of all sizes is offered.
2. Box cheapest, pack most expensive. Boxes and bars offered.
3. Pack cheapest, no boxes offered
4. Bar cheapest, no boxes or packs offered

### Example usage:

#### Request:

```
POST /price
{
  "count": 150,
  "barPrice": 2.3,
  "packPrice": 25,
  "boxPrice": 230,
  "packSize": 12,
  "boxSize": 120
}
```

#### Result

```
200 OK
{
  "boxCount": 1,
  "packCount": 2,
  "barCount": 6,
  "totalPrice": 293.8
}
```

### Local usage of the API:

Start application in [local mode](http://localhost:3003/):

```
npm start
```


Start application in [development mode](http://localhost:3003/):
```
npm run dev
```
