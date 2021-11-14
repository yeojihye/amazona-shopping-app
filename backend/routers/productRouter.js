import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const productRouter = express.Router()

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res, next) => {
    console.log('전체 제품 get')
    const products = await Product.find({}) // jpaRepository.save()
    res.send(products)
  })
)

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Product.remove({})
    const createdProducts = await Product.insertMany(data.products)
    res.send({ createdProducts })
  })
)

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) res.send(product)
    else res.status(404).send({ message: '발견된 제품이 없어요' })
  })
)

export default productRouter
