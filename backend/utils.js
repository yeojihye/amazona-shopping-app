import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somthing',
    {
      expiresIn: '30d',
    }
  )
}

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const token = authorization.slick(7, authorization.length) // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET || 'somthingsecret', (err, decode) => {
      if (err) {
        res.status(401).send({ message: '유효하지 않는 토큰입니다' })
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    res.status(401).send({ message: '토큰이 존재하지 않습니다' })
  }
}
