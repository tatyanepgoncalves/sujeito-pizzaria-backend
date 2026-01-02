import type { Request, Response } from 'express'
import { DetailsUserService } from '../../services/users/DetailsUserService.ts'

export class DetailsUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id

    const detailsUserService = new DetailsUserService()

    const user = await detailsUserService.execute(user_id)

    return res.json(user)
  }
}
