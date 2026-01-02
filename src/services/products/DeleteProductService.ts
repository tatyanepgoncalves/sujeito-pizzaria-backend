import prismaClient from '../../prisma/index.ts'

export class DeleteProductService {
  async execute(product_id: string) {
    try {
      await prismaClient.product.update({
        where: {
          id: product_id,
        },
        data: {
          disabled: true,
        },
      })

      return { message: 'Product delete sucessfully.' }
    } catch (err) {
      console.log(err)
      return { message: 'Failed to delete product.' }
    }
  }
}
