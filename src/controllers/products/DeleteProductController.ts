import type { Request, Response } from 'express'
import { DeleteProductService } from '../../services/products/DeleteProductService.ts'

export class DeleteProductController {
  async handle(req: Request, res: Response) {
    const product_id = req.query.product_id as string

    if (!product_id) {
      throw new Error("Product waasn't found.")
    }

    const deleteproductService = new DeleteProductService()

    const product = await deleteproductService.execute(product_id)

    return res.status(200).json(product)
  }
}
