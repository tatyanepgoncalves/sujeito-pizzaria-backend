import type { Request, Response } from 'express'
import { EditOrderByProductionService } from '../../services/orders/EditOrderByProductioService.ts'

export class EditOrderByProductionController {
  async handle(req: Request, res: Response) {
    const { order_id, name } = req.body

    const editOrderByProduction = new EditOrderByProductionService()

    const order = await editOrderByProduction.execute({ name, order_id })

    return res.status(200).json(order)
  }
}
