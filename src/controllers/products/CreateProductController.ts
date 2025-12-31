import type { Request, Response } from 'express'
import { CreateProductService } from '../../services/products/CreateProductService'

export class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body

    if (!req.file) {
      throw new Error('Product image is required')
    }

    const createProductService = new CreateProductService()

    const product = await createProductService.execute({
      name,
      price: Number.parseInt(price, 10),
      description,
      category_id,
      imageBuffer: req.file.buffer,
      imageName: req.file.originalname,
    })

    return res.status(201).json(product)
  }
}
