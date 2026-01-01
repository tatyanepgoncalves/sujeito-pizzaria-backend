import prismaClient from '../../prisma/index'

interface EditFinishOrderServiceProps {
  order_id: string
}

export class EditFinishOrderService {
  async execute({ order_id }: EditFinishOrderServiceProps) {
    try {
      // Check if exists order
      const orderExists = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
      })

      if (!orderExists) {
        throw new Error("The order wasn't found.")
      }

      // Update the order to finish (status -> true)
      const updateOrder = await prismaClient.order.update({
        where: {
          id: order_id,
        },
        data: {
          status: true,
        },
        select: {
          id: true,
          table: true,
          name: true,
          draft: true,
          status: true,
          createdAt: true,
        },
      })

      return updateOrder
    } catch (err) {
      console.log(err)
      throw new Error('Failed to update the status of the order.')
    }
  }
}
