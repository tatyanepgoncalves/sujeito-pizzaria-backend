import type { Request, Response } from 'express'
import { DeleteItemService } from '../../services/orders/DeleteItemService.ts'

export class DeleteItemController {
  async handle(req: Request, res: Response) {
    const { item_id } = req.query

    const deleteItemService = new DeleteItemService()

    const item = await deleteItemService.execute({
      item_id: item_id as string,
    })

    return res.status(200).json(item)
  }
}
