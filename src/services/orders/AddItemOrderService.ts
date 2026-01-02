import prismaClient from '../../prisma/index.ts'

interface AddItemOrderServiceProps {
  order_id: string
  product_id: string
  amount: number
}

export class AddItemOrderService {
  async execute({ order_id, product_id, amount }: AddItemOrderServiceProps) {
    try {
      const orderExists = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
      })

      if (!orderExists) {
        throw new Error("The order wasn't found.")
      }

      const productExists = await prismaClient.product.findFirst({
        where: {
          id: product_id,
          disabled: false,
        },
      })

      if (!productExists) {
        throw new Error("The product wasn't found.")
      }

      const item = await prismaClient.item.create({
        data: {
          order_id,
          product_id,
          amount,
        },
        select: {
          id: true,
          amount: true,
          order_id: true,
          product_id: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              description: true,
              banner: true,
            },
          },
        },
      })
      return item
    } catch (err) {
      console.log(err)
      throw new Error('Failed to add item to the order.')
    }
  }
}
