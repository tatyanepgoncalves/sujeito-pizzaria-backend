import type { NextFunction, Request, Response } from 'express'
import prismaClient from '../prisma/index.ts'

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user_id = req.user_id

  if (!user_id) {
    res.status(401).json({
      error: "The user doesn't have permission.",
    })
    return
  }

  const user = await prismaClient.user.findFirst({
    where: {
      id: user_id,
    },
  })

  if (!user) {
    res.status(401).json({
      error: "The user wasn't found.",
    })
    return
  }

  if (user.role !== 'ADMIN') {
    res.status(401).json({
      error: "The user doesn't have permission.",
    })
    return
  }

  // If the user is 'ADMIN' ... the flow continues
  return next()
}
