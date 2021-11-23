import express from 'express'
import mongoose from 'mongoose'
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URL || '', {})

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
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
