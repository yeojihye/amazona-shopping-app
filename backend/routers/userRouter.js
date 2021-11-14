import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils.js'

const userRouter = express.Router()

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await User.remove({})
    const createdUsers = await User.insertMany(data.users) // jpaRepository.save()
    res.send({ createdUsers })
  })
)

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        })
        return
      }
    }
    res.status(401).send({ message: '유효하지 않은 이메일 또는 비밀번호입니다.' })
  })
)

export default userRouter
