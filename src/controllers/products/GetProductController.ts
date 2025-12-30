import type { Request, Response } from 'express'
import { GetProductService } from '../../services/products/GetProductService'

export class GetProductController {
  async handle(req: Request, res: Response) {
    const disabled = req.query.disabled as string | undefined

    const getProductService = new GetProductService()

    const products = await getProductService.execute({
      disabled,
    })

    return res.status(200).json({
      products,
    })
  }
}
