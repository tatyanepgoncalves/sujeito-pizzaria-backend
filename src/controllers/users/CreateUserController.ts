import type { Request, Response } from 'express'
import { CreateUserService } from '../../services/users/CreateUserService'

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body

    console.log({ name, email, password })

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({ name, email, password })

    res.json({ message: user })
  }
}
