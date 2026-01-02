import prismaClient from '../../prisma/index.ts'

export class DeleteOrderService {
  async execute(order_id: string) {
    try {
      const orderExists = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
      })

      if (!orderExists) {
        throw new Error("The order wasn't found.")
      }

      const deleteOrder = await prismaClient.order.delete({
        where: {
          id: order_id,
        },
      })

      return deleteOrder
    } catch (err) {
      console.log(err)
      throw new Error('Failed to delete order.')
    }
  }
}
