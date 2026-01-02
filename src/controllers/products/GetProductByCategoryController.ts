import type { Request, Response } from 'express'
import { GetProductsByCategoryService } from '../../services/products/GetProductsByCategoryService.ts'

export class GetProductByCategoryController {
  async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string

    const getProductsByCategory = new GetProductsByCategoryService()

    const products = await getProductsByCategory.execute({
      category_id,
    })

    res.status(200).json(products)
  }
}
