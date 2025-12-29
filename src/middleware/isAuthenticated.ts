import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../env'

interface PayLoad {
  sub: string
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({
      error: 'Token not provided.',
    })
  }

  const [, token] = authToken.split(' ')

  try {
    const { sub } = jwt.verify(token!, env.JWT_SECRET) as PayLoad

    req.user_id = sub

    console.log(sub)

    return next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      error: 'Invalid token',
    })
  }
}
