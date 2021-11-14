import express from 'express'
import mongoose from 'mongoose'
import data from './data.js'
import userRouter from './routers/userRouter.js'

const app = express()
mongoose.connect(
  process.env.MONGODB_URL ||
    'mongodb+srv://jihye:1234@cluster0.jvzow.mongodb.net/amazonaEx?retryWrites=true&w=majority'
)
app.get('/api/products', (req, res) => {
  res.send(data.products)
})

app.use('/api/users', userRouter)

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: '제품이 발견되지 않았습니다.' })
  }
})

app.get('/api/products', (req, res) => {
  res.send(data.products)
})

app.get('/', (req, res) => {
  res.send('서버가 준비중이다')
})

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('서버가 5000 포트에서 실행중입니다.')
})
