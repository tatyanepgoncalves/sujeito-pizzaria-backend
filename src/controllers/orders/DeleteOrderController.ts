import type { Request, Response } from 'express'
import { DeleteOrderService } from '../../services/orders/DeleteOrderService.ts'

export class DeleteOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body

    const deleteOrderService = new DeleteOrderService()

    const order = await deleteOrderService.execute(order_id)

    return res.status(200).json(order)
  }
}
