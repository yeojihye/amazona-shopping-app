import express from 'express'
import data from './data.js'

const app = express()
app.get('/api/products', (req, res) => {
  res.send(data.products)
})

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: '제품이 발견되지 않았습니다.' })
  }
})

app.get('/', (req, res) => {
  res.send('서버가 준비중이다')
})

app.listen(5000, () => {
  console.log('서버가 5000 포트에서 실행중입니다.')
})
