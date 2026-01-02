import type { Request, Response } from 'express'
import { AuthUserService } from '../../services/users/AuthUserService.ts'

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    console.log({ email, password })

    const authUserService = new AuthUserService()

    const auth = await authUserService.execute({ email, password })

    res.json(auth)
  }
}
