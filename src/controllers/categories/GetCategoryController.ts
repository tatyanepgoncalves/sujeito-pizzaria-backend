import type { Request, Response } from 'express'
import { GetCategoryService } from '../../services/categories/GetCategoryService'

export class GetCategoryController {
  async handle(_: Request, res: Response) {
    const getCategoryService = new GetCategoryService()

    const categories = await getCategoryService.execute()

    return res.status(200).json({
      data: categories,
    })
  }
}
