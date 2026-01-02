import type { Request, Response } from 'express'
import { GetOrderService } from '../../services/orders/GetOrderService.ts'

export class GetOrderController {
  async handle(req: Request, res: Response) {
    const draft = req.query?.draft as string | undefined

    const getOrderService = new GetOrderService()

    const allOrder = await getOrderService.execute({
      draft,
    })

    return res.status(200).json(allOrder)
  }
}
