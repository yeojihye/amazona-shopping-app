import express from 'express'
import data from './data.js'

const app = express()
app.get('/api/products', (req, res) => {
  res.send(data.products)
})

app.get('/', (req, res) => {
  res.send('서버가 준비중이다')
})

app.listen(5000, () => {
  console.log('서버가 5000 포트에서 실행중입니다.')
})
