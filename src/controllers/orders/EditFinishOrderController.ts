import type { Request, Response } from 'express'
import { EditFinishOrderService } from '../../services/orders/EditFinishOrderService.ts'

export class EditFinishOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body

    const editOrderByProduction = new EditFinishOrderService()

    const order = await editOrderByProduction.execute({ order_id })

    return res.status(200).json(order)
  }
}
