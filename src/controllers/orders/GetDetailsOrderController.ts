import type { Request, Response } from 'express'
import { GetDetailsOrderService } from '../../services/orders/GetDetailsOrderService.ts'

export class GetDetailsOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.query

    const detailsOrder = new GetDetailsOrderService()

    const order = await detailsOrder.execute({
      order_id: order_id as string,
    })

    return res.status(200).json(order)
  }
}
